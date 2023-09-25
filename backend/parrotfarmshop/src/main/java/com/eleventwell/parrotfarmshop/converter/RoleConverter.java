package com.eleventwell.parrotfarmshop.converter;

import com.eleventwell.parrotfarmshop.dto.RoleDTO;
import com.eleventwell.parrotfarmshop.entity.RoleEntity;
import org.springframework.stereotype.Component;
//Cuong
@Component
public class RoleConverter {
    //    private List<UserEntity> users = new ArrayList<>();
    public RoleDTO toDTO(RoleEntity entity) {
        RoleDTO dto = new RoleDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        dto.setStatus(entity.getStatus());
        return dto;
    }

    //for Insert a new Role to Database
    /**
     * Converts a RoleDTO object to a RoleEntity.
     *
     * @param dto The RoleDTO object to convert.
     * @return The corresponding RoleEntity.
     */
    public RoleEntity toEntity(RoleDTO dto) {
        RoleEntity entity = new RoleEntity();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setStatus(dto.getStatus());
        return entity;
    }

    //for Update an existing Role to Database

    //update
    public RoleEntity toEntity(RoleEntity entity, RoleDTO dto) {
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setStatus(dto.getStatus());

        return entity;
    }
}
