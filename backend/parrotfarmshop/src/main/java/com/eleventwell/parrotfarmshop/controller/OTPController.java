package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.dto.OTPDTO;
import com.eleventwell.parrotfarmshop.service.impl.OTPService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/admin/OTP")
public class OTPController {

    @Autowired
    OTPService otpService;
    @PostMapping(value = "")
    public OTPDTO createOTP(@RequestBody OTPDTO otpdto){

        return otpService.save(otpdto);
    }
    @GetMapping(value = "/find-one-by-code-and-email")
    public OTPDTO findOTP(@RequestBody OTPDTO otpdto){

        return otpService.findOTP(otpdto);
    }

}
