package com.eleventwell.parrotfarmshop.security;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class RegisterRequest {

    private String userName;
    private String email;
    private String password;
    private String fullName;

}
