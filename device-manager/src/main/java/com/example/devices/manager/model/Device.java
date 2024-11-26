package com.example.devices.manager.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String description;

    @Column
    private String address;

    @Column(name = "maximum_hourly_consumption")
    private Double maximumHourlyConsumption;

    @Column(name = "persons_id")
    private List<Long> personIds;
}
