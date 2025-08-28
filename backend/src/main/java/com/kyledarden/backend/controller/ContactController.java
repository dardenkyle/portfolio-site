package com.kyledarden.backend.controller;

import com.kyledarden.backend.model.ContactRequest;
import com.kyledarden.backend.service.ContactService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class ContactController {

    private final ContactService service;

    public ContactController(ContactService service) {
        this.service = service;
    }

    @PostMapping("/contact")
    public ResponseEntity<Void> contact(@Valid @RequestBody ContactRequest req) {
        service.handle(req);
        return ResponseEntity.accepted().build(); // 202 Accepted
    }
}
