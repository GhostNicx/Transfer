package com.example.sample.repo.personDto;

import com.example.sample.repo.model.Role;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonDTO {
    private long id;
    private String name;
    private Role role;
    private String password; // new attribute
    private List<DeviceDTO> devices;
}