/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eleventwell.parrotfarmshop.converter;

import com.eleventwell.parrotfarmshop.dto.ParrotDTO;
import com.eleventwell.parrotfarmshop.entity.ParrotEntity;
import org.springframework.stereotype.Component;

/**
 *
 * @author Admin
 */
@Component
public class ParrotConverter {
    public ParrotDTO toDTO(ParrotEntity entity) {
        ParrotDTO dto = new ParrotDTO();
        
        dto.setId(entity.getId());
        dto.setParrotAge(entity.getParrotAge());
        dto.setAvailabilityStatus(entity.getAvailabilityStatus());
        dto.setPregnancyStatus(entity.getPregnancyStatus());
        dto.setHealthStatus(entity.getHealthStatus());
        dto.setNumberOfChildren(entity.getNumberOfChildren());
      //  dto.setOwnerId(entity.getOwner().getId());
        // Assuming you have relationships with UserEntity, ParrotSpeciesColorEntity, and ParrotEggNestEntity
       dto.setParrotSpeciesColorId(entity.getParrotSpeciesColor().getId());
    //    dto.setParrotEggNestId(entity.getParrotEggNest().getId());
     
        
       
        return dto;
    }

    public ParrotEntity toEntity(ParrotDTO dto) {
        ParrotEntity entity = new ParrotEntity();
        
        entity.setParrotAge(dto.getParrotAge());
        entity.setAvailabilityStatus(dto.getAvailabilityStatus());
        entity.setPregnancyStatus(dto.getPregnancyStatus());
        entity.setHealthStatus(dto.getHealthStatus());
        entity.setNumberOfChildren(dto.getNumberOfChildren());
 
     
        // Assuming you have relationships with UserEntity, ParrotSpeciesColorEntity, and ParrotEggNestEntity
      

        return entity;
    }

    public ParrotEntity toEntity(ParrotDTO dto, ParrotEntity entity) {
        entity.setParrotAge(dto.getParrotAge());
        entity.setAvailabilityStatus(dto.getAvailabilityStatus());
        entity.setPregnancyStatus(dto.getPregnancyStatus());
        entity.setHealthStatus(dto.getHealthStatus());
        entity.setNumberOfChildren(dto.getNumberOfChildren());

        // Assuming you have relationships with UserEntity, ParrotSpeciesColorEntity, and ParrotEggNestEntity
       

        return entity;
    }
}