///*
// * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
// * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
// */
//package com.eleventwell.parrotfarmshop.converter;
//
//import com.eleventwell.parrotfarmshop.dto.ParrotSpeciesColorDTO;
//import com.eleventwell.parrotfarmshop.entity.ParrotSpeciesColorEntity;
//import org.springframework.stereotype.Component;
//
///**
// *
// * @author Admin
// */
//
//@Component
//public class ParrotSpeciesColorConverter {
//   public ParrotSpeciesColorDTO toDTO(ParrotSpeciesColorEntity entity) {
//    ParrotSpeciesColorDTO dto = new ParrotSpeciesColorDTO();
//      dto.setId(entity.getId());
//    dto.setPrice(entity.getParrotSpeciesColorPrice());
//    dto.setImageUrl(entity.getParrotSpeciesColorImageUrl());
//    dto.setSpeciesID(entity.getParrotSpecies().getId());
//    dto.setColor(entity.getColor());
//    // You can map the list of ParrotDTO objects here if needed
//
//    return dto;
//}
//
//public ParrotSpeciesColorEntity toEntity(ParrotSpeciesColorDTO dto) {
//    ParrotSpeciesColorEntity entity = new ParrotSpeciesColorEntity();
//    entity.setParrotSpeciesColorPrice(dto.getPrice());
//    entity.setParrotSpeciesColorImageUrl(dto.getImageUrl());
//    entity.setColor(dto.getColor());
//
//    // Assuming you have a relationship with ParrotSpeciesEntity, you can set it here
//    // entity.setParrotSpecies(parrotSpeciesEntity);
//
//    // You can map the list of ParrotEntity objects here if needed
//
//    return entity;
//}
//
//public ParrotSpeciesColorEntity toEntity(ParrotSpeciesColorDTO dto, ParrotSpeciesColorEntity entity) {
//    entity.setParrotSpeciesColorPrice(dto.getPrice());
//    entity.setParrotSpeciesColorImageUrl(dto.getImageUrl());
//    entity.setColor(dto.getColor());
//
//    // Assuming you have a relationship with ParrotSpeciesEntity, you can set it here
//    // entity.setParrotSpecies(parrotSpeciesEntity);
//
//    // You can map the list of ParrotEntity objects here if needed
//
//    return entity;
//}
//
//}
