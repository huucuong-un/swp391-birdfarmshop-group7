/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eleventwell.parrotfarmshop.service.impl;

//import com.eleventwell.parrotfarmshop.converter.ParrotSpeciesColorConverter;
import com.eleventwell.parrotfarmshop.converter.GenericConverter;
import com.eleventwell.parrotfarmshop.dto.ParrotSpeciesColorDTO;
import com.eleventwell.parrotfarmshop.entity.ParrotSpeciesColorEntity;
//import com.eleventwell.parrotfarmshop.repository.GenericsRepository;
import com.eleventwell.parrotfarmshop.repository.ParrotSpeciesColorRepository;
import com.eleventwell.parrotfarmshop.repository.ParrotSpeciesRepository;
import com.eleventwell.parrotfarmshop.service.IGenericService;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class ParrotSpeciesColorService implements IGenericService<ParrotSpeciesColorDTO> {

    @Autowired
    private ParrotSpeciesColorRepository parrotSpeciesColorRepository;

    @Autowired
    private ParrotSpeciesRepository parrotSpeciesRepository;

    //@Autowired
    //private ParrotSpeciesColorConverter parrotSpeciesColorConverter;

    @Autowired
    private GenericConverter converter;



    @Override
    public List<ParrotSpeciesColorDTO> findAll() {
        // Implement logic to retrieve all ParrotSpeciesColor entities and convert them to DTOs
        List<ParrotSpeciesColorDTO> results = new ArrayList<>();
        List<ParrotSpeciesColorEntity> entities = parrotSpeciesColorRepository.findAll();

        for (ParrotSpeciesColorEntity entity : entities) {
            ParrotSpeciesColorDTO parrotSpeciesColorDTO = (ParrotSpeciesColorDTO) converter.toDTO(entity, ParrotSpeciesColorDTO.class);
            results.add(parrotSpeciesColorDTO);
        }

        return results;
    }

    @Override
    public ParrotSpeciesColorDTO save(ParrotSpeciesColorDTO parrotSpeciesColorDTO) {
        // Implement logic to save or update ParrotSpeciesColor entities
        ParrotSpeciesColorEntity parrotSpeciesColorEntity = new ParrotSpeciesColorEntity();
        if (parrotSpeciesColorDTO.getId() != null) {
            ParrotSpeciesColorEntity oldEntity = parrotSpeciesColorRepository.findOneById(parrotSpeciesColorDTO.getId());
            parrotSpeciesColorEntity = (ParrotSpeciesColorEntity) converter.updateEntity(parrotSpeciesColorDTO, oldEntity);
        } else {
            parrotSpeciesColorEntity = (ParrotSpeciesColorEntity) converter.toEntity(parrotSpeciesColorDTO, ParrotSpeciesColorEntity.class);
        }
//        ParrotSpeciesEntity parrotSpeciesEntity = parrotSpeciesRepository.findOneById(parrotSpeciesColorDTO.getSpeciesID());
//        parrotSpeciesColorEntity.setParrotSpecies(parrotSpeciesEntity);
        parrotSpeciesColorEntity = parrotSpeciesColorRepository.save(parrotSpeciesColorEntity);
        return (ParrotSpeciesColorDTO) (ParrotSpeciesColorDTO) converter.toDTO(parrotSpeciesColorEntity, ParrotSpeciesColorDTO.class);
    }

    @Override
    public void changeStatus(Long id) {
ParrotSpeciesColorEntity entity = parrotSpeciesColorRepository.findOneById(id);


    }

}
