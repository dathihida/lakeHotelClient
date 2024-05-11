package com.lakeHotel.lakeHotel.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank
    public String email;
    @NotBlank
    public String password;
}
