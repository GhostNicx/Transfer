package com.example.sample.controller;

import com.example.sample.repo.personDto.LoginRequest;
import com.example.sample.repo.personDto.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.sample.service.PersonService;
import com.example.sample.repo.model.Person;
import com.example.sample.repo.personDto.PersonDTO;

import java.util.List;

@RestController
@RequestMapping("/persons")
//@CrossOrigin(origins = "http://localhost:4200")
public class PersonController {

    @Autowired
    private PersonService personService;

    @PostMapping("/create")
    public ResponseEntity<Person> createPerson(@RequestBody PersonDTO personDTO) {
        personService.createPerson(personDTO);
        Person createdPerson = personService.findByname(personDTO.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPerson); // Return the created person
    }

    @GetMapping
    public ResponseEntity<List<Person>> retrievePersons(@RequestHeader("userRole") String userRole) {
        return ResponseEntity.ok(personService.retrievePersons(userRole));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Person> retrievePerson(@PathVariable Long id, @RequestHeader("userRole") String userRole) {
        return ResponseEntity.ok(personService.retrievePerson(id, userRole));
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> deletePerson(@PathVariable Long id, @RequestHeader("userRole") String userRole) {
        personService.deletePerson(id, userRole);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Person> updatePerson(@PathVariable Long id, @RequestBody PersonDTO personDTO, @RequestHeader("userRole") String userRole) {
        personDTO.setId(id);
        personService.updatePerson(personDTO, userRole);
        Person updatedPerson = personService.retrievePerson(id, userRole);
        return ResponseEntity.ok(updatedPerson); // Return the updated person
    }
    @GetMapping("devices/{id}")
    public ResponseEntity<PersonDTO> getPersonById(@PathVariable Long id) {
        PersonDTO personDTO = personService.getPersonById(id);
        if (personDTO != null) {
            return ResponseEntity.ok(personDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Person user = personService.findByname(request.getUsername());

        if (user != null && user.getPassword().equals(request.getPassword())) {
            // Convert the Role enum to a string
            String roleAsString = user.getRole().toString(); // or use user.getRole().name()
            return ResponseEntity.ok(new LoginResponse(roleAsString, user.getId()));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    // New endpoint to get all persons with their devices
    @GetMapping("/allWithDevices")
    public ResponseEntity<List<PersonDTO>> getAllPersonsWithDevices() {
        List<PersonDTO> personsWithDevices = personService.getAllPersonsWithDevices();
        return ResponseEntity.ok(personsWithDevices);
    }

}