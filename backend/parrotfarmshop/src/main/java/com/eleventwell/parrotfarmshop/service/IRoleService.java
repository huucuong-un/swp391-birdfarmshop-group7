package com.eleventwell.parrotfarmshop.service;

import com.eleventwell.parrotfarmshop.dto.RoleDTO;

import java.util.List;
//Cuong
public interface IRoleService {
    List<RoleDTO> findAll();

    RoleDTO save(RoleDTO dto);


}
