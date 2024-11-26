package com.example.sample.repo.personDto;

import lombok.Data;

@Data
public class LoginResponse {
    private String role;
    private Long userId;

    public LoginResponse(String role, Long userId) {
        this.role = role;
        this.userId = userId;
    }

}
