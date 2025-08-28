package com.kyledarden.backend.service;

import com.kyledarden.backend.model.ContactRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class ContactService {
    private static final Logger log = LoggerFactory.getLogger(ContactService.class);

    public void handle(ContactRequest req) {
        // MVP: just log, replace with email or DB later
        log.info("Contact form submitted: name='{}', email='{}', messageLength={}",
                 req.name(), req.email(), req.message().length());
    }
}
