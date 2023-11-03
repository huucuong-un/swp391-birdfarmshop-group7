package com.eleventwell.parrotfarmshop.security;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class ResetPasswordRequest {
    private String email;
    private String newPassword;
}
