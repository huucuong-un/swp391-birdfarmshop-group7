/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.converter.ParrotConverter;
import com.eleventwell.parrotfarmshop.dto.ParrotDTO;
import com.eleventwell.parrotfarmshop.entity.ParrotEntity;
import com.eleventwell.parrotfarmshop.repository.ParrotRepository;
import com.eleventwell.parrotfarmshop.repository.ParrotSpeciesColorRepository;
import com.eleventwell.parrotfarmshop.service.IParrotService;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class ParrotService implements IParrotService{

    
      @Autowired
   private ParrotRepository parrotRepository;
      
      @Autowired
   private ParrotSpeciesColorRepository parrotSpeciesColorRepository;
      
      @Autowired
      private ParrotConverter parrotConverter;
      
    
    @Override
    public List<ParrotDTO> findAll() {
       List<ParrotDTO> result = new ArrayList<>();
       List<ParrotEntity> entities = parrotRepository.findAll();
       
        for (ParrotEntity entity : entities) {
            result.add(parrotConverter.toDTO(entity));
            
        }
       
       return result; 
    }

    @Override
    public ParrotDTO save(ParrotDTO parrotDTO) {
     ParrotEntity parrotEntity = new ParrotEntity();
     
     if(parrotDTO.getId() != null){
         ParrotEntity oldEntity = parrotRepository.findOneById(parrotDTO.getId());
         parrotEntity = parrotConverter.toEntity(parrotDTO, oldEntity);
         
         
     }else{
         parrotEntity =parrotConverter.toEntity(parrotDTO);
     }
     parrotEntity.setParrotSpeciesColor(parrotSpeciesColorRepository.findOneById(parrotDTO.getParrotSpeciesColorId()));
  // parrotEntity.setOwner();
  //parrotEntity.setParrotEggNest(parrotEggNest);
  parrotRepository.save(parrotEntity);
  return parrotConverter.toDTO(parrotEntity);
    }

    @Override
    public void delete(long[] ids) {
       
          for (long id : ids) {
            parrotRepository.deleteById(id);
        }

    }
    
}
