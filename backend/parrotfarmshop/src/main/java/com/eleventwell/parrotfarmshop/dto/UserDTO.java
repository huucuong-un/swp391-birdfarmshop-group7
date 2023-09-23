package com.eleventwell.parrotfarmshop.dto;

import com.eleventwell.parrotfarmshop.entity.RoleEntity;
import lombok.*;


@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDTO extends BaseDTO {
    private String userName;
    private String password;
    private String email;
    private String fullName;
    private Boolean status;
    private RoleEntity role;


}
