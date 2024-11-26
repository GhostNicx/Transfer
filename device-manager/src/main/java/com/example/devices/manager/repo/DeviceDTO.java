package com.example.devices.manager.repo;

import lombok.Data;

@Data
public class DeviceDTO {
    private Long id;
    private String description;
    private String address;
    private Double maximumHourlyConsumption;
}
