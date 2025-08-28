package com.kyledarden.backend.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactRequest(
    @NotBlank @Size(max = 120) String name,
    @Email @NotBlank @Size(max = 254) String email,
    @NotBlank @Size(max = 5000) String message
) {}
