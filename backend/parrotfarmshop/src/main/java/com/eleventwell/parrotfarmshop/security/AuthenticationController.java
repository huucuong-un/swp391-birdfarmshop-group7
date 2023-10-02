package com.eleventwell.parrotfarmshop.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class AuthenticationController {

    @Autowired
    AuthenticationService service;
    @PostMapping(value = "register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ){
return  ResponseEntity.ok(service.register(request));
    }
    @PostMapping(value = "authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request){
        return  ResponseEntity.ok(service.authenticate(request));

    }
}
