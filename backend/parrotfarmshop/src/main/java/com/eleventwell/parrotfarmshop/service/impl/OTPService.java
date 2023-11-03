package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.converter.GenericConverter;
import com.eleventwell.parrotfarmshop.dto.OTPDTO;
import com.eleventwell.parrotfarmshop.entity.OTPEnity;
import com.eleventwell.parrotfarmshop.repository.OTPRepository;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Timer;
import java.util.TimerTask;

@Service
public class OTPService {
    @Autowired
    OTPRepository otpRepository;

    @Autowired
    GenericConverter genericConverter;
    public OTPDTO save(OTPDTO otpdto){
        try {
            OTPEnity otpEnity = (OTPEnity) genericConverter.toEntity(otpdto, OTPEnity.class);
            OTPEnity oTemp = otpRepository.findOneByEmail(otpdto.getEmail());
            if(oTemp !=null){
otpRepository.deleteById(oTemp.getId());
            }
            otpRepository.save(otpEnity);
            scheduleOtpCleanup(otpEnity.getId());
            return (OTPDTO) genericConverter.toDTO(otpEnity,OTPDTO.class);
        }catch (Exception e){
            throw new RuntimeException(e);
        }

    }


    public void scheduleOtpCleanup(Long otp) {
        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                otpRepository.deleteById(otp);
                timer.cancel();
            }
        }, 120000); // 2 phút (120,000 milliseconds)
    }

    public OTPDTO findOTP(String email, String code){
        try {
            return (OTPDTO) genericConverter.toDTO(otpRepository.findOneByEmailAndCode(email,code),OTPDTO.class);

        }catch (Exception e){
            return null;
        }

    }


}
