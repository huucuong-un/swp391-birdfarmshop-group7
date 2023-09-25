package com.eleventwell.parrotfarmshop.service;

import com.eleventwell.parrotfarmshop.dto.RoleDTO;
import com.eleventwell.parrotfarmshop.dto.UserDTO;

import java.util.List;


public interface IUserService {

    List<UserDTO> findAll();

    UserDTO save(UserDTO dto);
}
