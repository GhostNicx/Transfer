package com.example.devices.manager.controller;

import com.example.devices.manager.repo.DeviceDTO;
import com.example.devices.manager.Service.DeviceService;
import com.example.devices.manager.repo.DeviceMappingDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/devices")
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    @PostMapping("/assign")
    public ResponseEntity<Void> assignDeviceToPerson(@RequestBody DeviceMappingDTO deviceMappingDTO) {
        deviceService.assignDeviceToPerson(deviceMappingDTO.deviceId, deviceMappingDTO.personId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/getAll")
    public List<DeviceDTO> getAllDevices() {
        return deviceService.getAllDevices();
    }

    @GetMapping("/get/{id}")
    public Optional<DeviceDTO> getDeviceById(@PathVariable Long id) {
        return deviceService.getDeviceById(id);
    }

    @PostMapping("/create")
    public DeviceDTO createDevice(@RequestBody DeviceDTO deviceDTO) {
        return deviceService.createDevice(deviceDTO);
    }

    @PutMapping("/update/{id}")
    public DeviceDTO updateDevice(@PathVariable Long id, @RequestBody DeviceDTO deviceDTO) {
        return deviceService.updateDevice(id, deviceDTO);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteDevice(@PathVariable Long id) {
        deviceService.deleteDevice(id);
    }

    @GetMapping("/person/{personId}")
    public List<DeviceDTO> getDevicesByPersonId(@PathVariable Long personId) {
        return deviceService.getDevicesByPersonId(personId);
    }
}
