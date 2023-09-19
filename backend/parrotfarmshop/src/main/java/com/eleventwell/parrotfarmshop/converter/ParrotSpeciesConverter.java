/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eleventwell.parrotfarmshop.converter;

import com.eleventwell.parrotfarmshop.dto.ParrotSpeciesDTO;
import com.eleventwell.parrotfarmshop.entity.ParrotSpeciesEntity;
import org.springframework.stereotype.Component;

/**
 *
 * @author ASUS
 */

@Component
public class ParrotSpeciesConverter {

    public ParrotSpeciesDTO toDTO(ParrotSpeciesEntity entity) {
        ParrotSpeciesDTO dto = new ParrotSpeciesDTO();
        if (entity.getId() != null) {
            dto.setId(entity.getId());
        }
//		dto.setTitle(newEntity.getTitle());
//		dto.setContent(newEntity.getContent());
//		dto.setShortDescription(newEntity.getShortDescription());
//		dto.setThumbnail(newEntity.getThumbnail());
//		dto.setCreatedDate(newEntity.getCreatedDate());
//		dto.setCreatedBy(newEntity.getCreatedBy());
//		dto.setModifiedDate(newEntity.getModifiedDate());
//		dto.setModifiedBy(newEntity.getModifiedBy());

        dto.setId(entity.getId());
        dto.setParrotSpeciesName(entity.getParrotSpeciesName());
        dto.setParrotSpeciesQuantity(entity.getParrotSpeciesQuantity());
        dto.setParrotSpeciesDescription(entity.getParrotSpeciesDescription());
        dto.setAvailabilityStatus(entity.getAvailabilityStatus());
        dto.setParrotSpeciesNestQuantity(entity.getParrotSpeciesNestQuantity());

        dto.setParrotSpeciesOrigin(entity.getParrotSpeciesOrigin());
        dto.setParrotSpeciesAverageWeight(entity.getParrotSpeciesAverageWeight());
        dto.setParrotAverageRating(entity.getParrotAverageRating());
        dto.setNestAverageRating(entity.getNestAverageRating());

        return dto;
    }
}
