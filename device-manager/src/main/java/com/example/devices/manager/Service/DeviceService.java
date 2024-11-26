package com.example.devices.manager.Service;

import com.example.devices.manager.model.Device;
import com.example.devices.manager.repo.DeviceRepo;
import com.example.devices.manager.repo.DeviceDTO;
import com.example.devices.manager.model.PersonDTO;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DeviceService {

    @Autowired
    private DeviceRepo deviceRepository;

    private final RestTemplate restTemplate;

    @Autowired
    public DeviceService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    // Convert Device entity to DeviceDTO
    private DeviceDTO convertToDto(Device device) {
        DeviceDTO deviceDTO = new DeviceDTO();
        deviceDTO.setId(device.getId());
        deviceDTO.setDescription(device.getDescription());
        deviceDTO.setAddress(device.getAddress());
        deviceDTO.setMaximumHourlyConsumption(device.getMaximumHourlyConsumption());
        return deviceDTO;
    }

    // Convert DeviceDTO to Device entity
    private Device convertToEntity(DeviceDTO deviceDTO) {
        Device device = new Device();
        device.setId(deviceDTO.getId());
        device.setDescription(deviceDTO.getDescription());
        device.setAddress(deviceDTO.getAddress());
        device.setMaximumHourlyConsumption(deviceDTO.getMaximumHourlyConsumption());
        return device;
    }

    // Create or Update Device
    public DeviceDTO createDevice(DeviceDTO deviceDTO) {
        if (deviceDTO.getId() != null) {
            throw new IllegalArgumentException("New devices should not have an ID");
        }
        Device device = convertToEntity(deviceDTO);
        Device savedDevice = deviceRepository.save(device);
        return convertToDto(savedDevice);
    }

    public DeviceDTO updateDevice(Long id, DeviceDTO deviceDTO) {
        if (!deviceRepository.existsById(id)) {
            throw new EntityNotFoundException("Device not found");
        }
        deviceDTO.setId(id);
        Device device = convertToEntity(deviceDTO);
        Device updatedDevice = deviceRepository.save(device);
        return convertToDto(updatedDevice);
    }


    // Retrieve all devices
    public List<DeviceDTO> getAllDevices() {
        List<Device> devices = deviceRepository.findAll();
        return devices.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Retrieve device by ID
    public Optional<DeviceDTO> getDeviceById(Long id) {
        Optional<Device> device = deviceRepository.findById(id);
        return device.map(this::convertToDto);
    }

    // Delete device by ID
    public void deleteDevice(Long id) {
        deviceRepository.deleteById(id);
    }

    public void assignDeviceToPerson(Long deviceId, Long personId) {
        try {
            Device device = deviceRepository.findById(deviceId).orElseThrow(() -> new RuntimeException("Device not found"));
            List<Long> personIds = device.getPersonIds();
            if (personIds == null) {
                personIds = new ArrayList<>();
            }
            personIds.add(personId);
            device.setPersonIds(personIds);
            deviceRepository.save(device);
        } catch (Exception e) {
            // Log the error for easier debugging
            e.printStackTrace();
            throw new RuntimeException("Error assigning device to person: " + e.getMessage());
        }
    }

    public List<DeviceDTO> getDevicesByPersonId(Long personId) {
        List<Device> devices = deviceRepository.findByPersonIds(personId);
        return devices.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

}
