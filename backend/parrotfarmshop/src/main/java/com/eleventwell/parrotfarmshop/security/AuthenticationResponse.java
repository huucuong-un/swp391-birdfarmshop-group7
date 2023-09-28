package com.eleventwell.parrotfarmshop.security;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class AuthenticationResponse {

    private String token;
}
