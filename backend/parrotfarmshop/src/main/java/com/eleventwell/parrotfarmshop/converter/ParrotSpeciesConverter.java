///*
// * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
// * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
// */
//package com.eleventwell.parrotfarmshop.converter;
//
//import com.eleventwell.parrotfarmshop.dto.ParrotSpeciesDTO;
//import com.eleventwell.parrotfarmshop.entity.ParrotSpeciesEntity;
//import org.springframework.stereotype.Component;
//
///**
// *
// * @author ASUS
// */
//
//@Component
//public class ParrotSpeciesConverter {
//
//    public ParrotSpeciesDTO toDTO(ParrotSpeciesEntity entity) {
//        ParrotSpeciesDTO dto = new ParrotSpeciesDTO();
//        if (entity.getId() != null) {
//            dto.setId(entity.getId());
//        }
//        dto.setId(entity.getId());
//        dto.setName(entity.getParrotSpeciesName());
//        dto.setPQuantity(entity.getParrotSpeciesQuantity());
//        dto.setDescription(entity.getParrotSpeciesDescription());
//        dto.setStatus(entity.getAvailabilityStatus());
//        dto.setNQuantity(entity.getParrotSpeciesNestQuantity());
//
//        dto.setOrigin(entity.getParrotSpeciesOrigin());
//        dto.setAverageWeight(entity.getParrotSpeciesAverageWeight());
//        dto.setPAverageRating(entity.getParrotAverageRating());
//        dto.setNAverageRating(entity.getNestAverageRating());
//
//        return dto;
//    }
//      public ParrotSpeciesEntity toEntity(ParrotSpeciesDTO dto) {
//        ParrotSpeciesEntity entity = new ParrotSpeciesEntity();
//
//        entity.setId(dto.getId());
//        entity.setParrotSpeciesName(dto.getName());
//        entity.setParrotSpeciesQuantity(dto.getPQuantity());
//        entity.setParrotSpeciesDescription(dto.getDescription());
//        entity.setAvailabilityStatus(dto.getStatus());
//        entity.setParrotSpeciesNestQuantity(dto.getNQuantity());
//
//        entity.setParrotSpeciesOrigin(dto.getOrigin());
//        entity.setParrotSpeciesAverageWeight(dto.getAverageWeight());
//        entity.setParrotAverageRating(dto.getPAverageRating());
//        entity.setNestAverageRating(dto.getNAverageRating());
//
//        return entity;
//    }
//     public ParrotSpeciesEntity toEntity(ParrotSpeciesDTO dto, ParrotSpeciesEntity entity) {
//
//
//    // Set properties on the parrotEntity based on the parrotDTO
//    entity.setParrotSpeciesName(dto.getName());
//    entity.setParrotSpeciesQuantity(dto.getPQuantity());
//    entity.setParrotSpeciesNestQuantity(dto.getNQuantity());
//    entity.setParrotSpeciesDescription(dto.getDescription());
//    entity.setAvailabilityStatus(dto.getStatus());
//    entity.setParrotSpeciesOrigin(dto.getOrigin());
//    entity.setParrotSpeciesAverageWeight(dto.getAverageWeight());
//    entity.setParrotAverageRating(dto.getPAverageRating());
//    entity.setNestAverageRating(dto.getNAverageRating());
//
//    // If parrotDTO has an ID, it indicates an update operation
//
//
//    return entity;
//}
//}
