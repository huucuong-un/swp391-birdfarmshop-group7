package com.eleventwell.parrotfarmshop.dto;

import lombok.*;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OTPDTO extends BaseDTO{
    private String email;
    private String code;
}
