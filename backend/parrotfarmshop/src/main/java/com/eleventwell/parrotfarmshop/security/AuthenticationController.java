package com.eleventwell.parrotfarmshop.security;

import com.eleventwell.parrotfarmshop.dto.UserDTO;
import com.eleventwell.parrotfarmshop.service.impl.UserService;
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

    @Autowired
    UserService userService;

    @PostMapping(value = "register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ){
return  ResponseEntity.ok(service.register(request));
    }
    @PostMapping(value = "authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request) {
        return  ResponseEntity.ok(service.authenticate(request));

    }

    @PostMapping(value = "/login-with-google/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticateForUserLoginWithGoogle(
            @RequestBody AuthenticationRequest request){
        return  ResponseEntity.ok(service.authenticateForUserLoginWithGoogle(request));

    }

    @PostMapping(value = "/change-password")
    public ResponseEntity<AuthenticationResponse> changePassword(@RequestBody ChangePasswordRequest request) {
        UserDTO user = userService.findByUsername(request.getCurrentUsername());
        if(!)
    }
}
