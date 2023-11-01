package com.eleventwell.parrotfarmshop.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@ToString
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
@Table(name = "OTP")
public class OTPEnity extends BaseEntity {
    private String email;
    private String code;
}
