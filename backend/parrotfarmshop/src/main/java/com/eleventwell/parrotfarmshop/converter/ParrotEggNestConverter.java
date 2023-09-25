package com.eleventwell.parrotfarmshop.converter;

import com.eleventwell.parrotfarmshop.dto.ParrotEggNestDTO;
import com.eleventwell.parrotfarmshop.dto.ParrotSpeciesDTO;
import com.eleventwell.parrotfarmshop.entity.ParrotEggNestEntity;
import com.eleventwell.parrotfarmshop.entity.ParrotSpeciesEntity;
import org.springframework.stereotype.Component;

@Component
public class ParrotEggNestConverter {

    public ParrotEggNestDTO toDTO(ParrotEggNestEntity entity) {
        ParrotEggNestDTO dto = new ParrotEggNestDTO();

        dto.setId(entity.getId());
        //dto.setOrderDetailId(entity.getOrderDetail().getId());
//        dto.setParrots(entity.getParrots());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setMomId(entity.getParrotMom().getId());
        dto.setDadId(entity.getParrotDad().getId());
        dto.setStatus(entity.getParrotEggNestStatus());

        return dto;
    }

    //For insert to database
    public ParrotEggNestEntity toEntity(ParrotEggNestDTO dto) {
        ParrotEggNestEntity entity = new ParrotEggNestEntity();

        entity.setId(dto.getId());
//        entity.setOrderDetail(dto.getOrderDetailId()); not convert here, it will be convert in IParrotEggNestService
//        entity.setParrots(dto.getParrots());
        entity.setCreatedDate(dto.getCreatedDate());
//        entity.setParrotMom(dto.getParrotMomId()); not convert here, it will be convert in IParrotEggNestService
//        entity.setParrotDad(dto.getParrotDadId()); not convert here, it will be convert in IParrotEggNestService
        entity.setParrotEggNestStatus(dto.getStatus());

        return entity;
    }

    //For update to database
    public ParrotEggNestEntity toEntity(ParrotEggNestDTO dto, ParrotEggNestEntity entity) {
        entity.setId(dto.getId());
//        entity.setOrderDetail(dto.getOrderDetailId()); not convert here, it will be convert in IParrotEggNestService
    //    entity.setParrots(dto.getParrots());
        entity.setCreatedDate(dto.getCreatedDate());
//        entity.setParrotMom(dto.getParrotMomId()); not convert here, it will be convert in IParrotEggNestService
//        entity.setParrotDad(dto.getParrotDadId()); not convert here, it will be convert in IParrotEggNestService
        entity.setParrotEggNestStatus(dto.getStatus());



        return entity;
    }
}
