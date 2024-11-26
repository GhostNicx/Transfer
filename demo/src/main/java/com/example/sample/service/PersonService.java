package com.example.sample.service;

import com.example.sample.repo.model.Person;
import com.example.sample.repo.model.Role;
import com.example.sample.repo.personDto.DeviceDTO;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.sample.repo.security.PersonRepo;
import com.example.sample.repo.personDto.PersonDTO;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PersonService {
    @Autowired
    private PersonRepo personRepo;

    @Autowired
    private RestTemplate restTemplate;

    private static final String DEVICE_SERVICE_URL = "http://localhost:8080/devices";

    public void createPerson (PersonDTO personDTO) {
        Person person = new Person();
        person.setName(personDTO.getName());
        person.setRole(personDTO.getRole() != null ? personDTO.getRole() : Role.USER);
        person.setPassword(personDTO.getPassword());
        personRepo.save(person);
    }

    public List <Person> retrievePersons(String userRole) {
        if (!userRole.equals("ADMIN")) {
            throw new RuntimeException("Unauthorized");
        }
        return (List<Person>) personRepo.findAll();
    }

    public Person retrievePerson(long id, String userRole) {
        if (!userRole.equals("ADMIN")) {
            throw new RuntimeException("Unauthorized");
        }
        return personRepo.findById(id).orElse(null);
    }

    public void deletePerson(Long id, String userRole) {
        if (!userRole.equals("ADMIN")) {
            throw new RuntimeException("Unauthorized");
        }
        personRepo.deleteById(id);
    }

    public void updatePerson(PersonDTO personDTO, String userRole) {
        if (!userRole.equals("ADMIN")) {
            throw new RuntimeException("Unauthorized");
        }
        Person person = personRepo.findById(personDTO.getId()).orElse(null);
        if (person != null) {
            person.setName(personDTO.getName());
            person.setRole(personDTO.getRole());
            personRepo.save(person);
        }
    }
    public PersonDTO getPersonById(Long id) {
        Person person = personRepo.findById(id).orElse(null);
        if (person != null) {
            // Call Device service to get devices for this person
            List<DeviceDTO> devices = restTemplate.getForObject(DEVICE_SERVICE_URL + "/person/" + id, List.class);
            PersonDTO personDTO = convertToDto(person);
            personDTO.setDevices(devices);
            return personDTO;
        }
        return null;
    }

    // Fetch devices associated with the person
    private List<DeviceDTO> getDevicesForPerson(Long personId) {
        String url = DEVICE_SERVICE_URL + "/person/" + personId;  // Assuming your device service has an endpoint to get devices for a person
        ResponseEntity<List<DeviceDTO>> response = restTemplate.exchange(
                url, HttpMethod.GET, null, new ParameterizedTypeReference<List<DeviceDTO>>() {});
        return response.getBody();
    }

    // Helper method to convert Person entity to PersonDTO
    private PersonDTO convertToDto(Person person) {
        PersonDTO personDTO = new PersonDTO();
        personDTO.setId(person.getId());
        personDTO.setName(person.getName());
        personDTO.setRole(person.getRole());
        //personDTO.setPassword(person.getPassword());
        // Optional: we can exclude password or other sensitive data
        return personDTO;
    }

    //handling login with find by username
    public Person findByname(String username) {
        return personRepo.findByname(username).orElse(null);
    }

    // New method to get all persons with their devices
    public List<PersonDTO> getAllPersonsWithDevices() {
        List<Person> persons = (List<Person>) personRepo.findAll();
        return persons.stream()
                .map(person -> {
                    PersonDTO personDTO = convertToDto(person);
                    List<DeviceDTO> devices = getDevicesForPerson(person.getId());
                    personDTO.setDevices(devices);
                    return personDTO;
                })
                .collect(Collectors.toList());
    }

}