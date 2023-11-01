package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.OTPEnity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OTPRepository extends JpaRepository<OTPEnity,Long> {


    OTPEnity findOneByEmailAndCode(String email, String code);
}
