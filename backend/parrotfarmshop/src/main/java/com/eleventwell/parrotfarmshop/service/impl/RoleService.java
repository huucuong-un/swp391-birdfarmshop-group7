package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.dto.RoleDTO;
import com.eleventwell.parrotfarmshop.entity.RoleEntity;
import com.eleventwell.parrotfarmshop.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
//Cuong
@Service
public class RoleService implements IRoleService {
    @Autowired
    RoleConverter roleConverter;

    @Autowired
    RoleRepository roleRepository;

    @Override
    public List<RoleDTO> findAll() {
        List<RoleDTO> results = new ArrayList<>();

        List<RoleEntity> entities = roleRepository.findAll();
        for (RoleEntity entity :
                entities) {
            RoleDTO roleDTO = roleConverter.toDTO(entity);
            results.add(roleDTO);
        }


        return results;
    }

    //accept editing description and status only

    @Override
    public RoleDTO save(RoleDTO dto) {
        RoleEntity roleEntity = new RoleEntity();
        if(dto.getId() == null) { //not have been added before
            roleEntity = roleConverter.toEntity(dto);
        } else {
            RoleEntity oldRoleEntity = roleRepository.findOneById(dto.getId());
            roleEntity = roleConverter.toEntity(oldRoleEntity, dto);
        }

        roleRepository.save(roleEntity);



        return roleConverter.toDTO(roleEntity);
    }

}
