package com.vanvan.dto;

import com.vanvan.enums.RegistrationStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.br.CPF;

public record DriverUpdateDTO(

    @Size(min = 4, max = 120)
    String name,

    @Email
    String email,

    @Pattern(regexp = "\\d{10,11}")
    String phone,

    @Pattern(regexp = "\\d{11}")
    String cnh,

    @CPF
    String cpf,

    RegistrationStatus registrationStatus
) {}
