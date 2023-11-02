package com.eleventwell.parrotfarmshop.security;

import com.eleventwell.parrotfarmshop.dto.UserDTO;
import com.eleventwell.parrotfarmshop.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/user")
public class AuthenticationController {


    @Autowired
    AuthenticationService service;

    @Autowired
    UserService userService;

    @PostMapping(value = "register")
    public ResponseEntity<String> register(
            @RequestBody RegisterRequest request
    ){
return  ResponseEntity.ok(service.register(request).getToken());
    }
//    @PostMapping(value = "authenticate")
//    public ResponseEntity<AuthenticationResponse> authenticate(
//            @RequestBody AuthenticationRequest request) {
//        return ResponseEntity.ok(service.authenticate(request));
//
//    }
    @PostMapping(value = "authenticate")
    public ResponseEntity<String> authenticate(
            @RequestBody AuthenticationRequest request) {

        return  ResponseEntity.ok(service.authenticate(request).getToken());

    }

//    @PostMapping(value = "/login-with-google/authenticate")
//    public ResponseEntity<AuthenticationResponse> authenticateForUserLoginWithGoogle(
//            @RequestBody AuthenticationRequest request){
//        return  ResponseEntity.ok(service.authenticateForUserLoginWithGoogle(request));
//
//    }
    @PostMapping(value = "/login-with-google/authenticate")
    public ResponseEntity<String> authenticateForUserLoginWithGoogle(
            @RequestBody AuthenticationRequest request){
    if(service.authenticateForUserLoginWithGoogle(request) !=null){
        return  ResponseEntity.ok(service.authenticateForUserLoginWithGoogle(request).getToken());

    }
return null;
    }


    @PostMapping(value = "/change-password")
    public ResponseEntity<AuthenticationResponse> changePassword(@RequestBody ChangePasswordRequest request) {

        if(service.changePassword(request) == null) {
            return null;
        }

        return ResponseEntity.ok(service.changePassword(request));
    }

    @PostMapping(value = "/reset-password")
    public ResponseEntity<AuthenticationResponse> resetPassword(@RequestBody ResetPasswordRequest request) {

        if(service.resetPassword(request) == null) {
            return null;
        }

        return ResponseEntity.ok(service.resetPassword(request));
    }

    @PutMapping(value = "/update-profile")
    public ResponseEntity<AuthenticationResponse> updateProfile(@RequestBody UpdateProfileRequest request) {


        return ResponseEntity.ok(service.updateProfile(request));
    }

}
