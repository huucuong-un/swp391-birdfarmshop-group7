package com.eleventwell.parrotfarmshop.service.impl;

//import com.eleventwell.parrotfarmshop.converter.ParrotConverter;
import com.eleventwell.parrotfarmshop.converter.Converter;
import com.eleventwell.parrotfarmshop.converter.ParrotEggNestConverter;
import com.eleventwell.parrotfarmshop.dto.ParrotDTO;
import com.eleventwell.parrotfarmshop.dto.ParrotEggNestDTO;
import com.eleventwell.parrotfarmshop.entity.ParrotEggNestEntity;
import com.eleventwell.parrotfarmshop.entity.ParrotEntity;
import com.eleventwell.parrotfarmshop.repository.ParrotEggNestRepository;
import com.eleventwell.parrotfarmshop.repository.ParrotRepository;
import com.eleventwell.parrotfarmshop.repository.ParrotSpeciesColorRepository;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import com.eleventwell.parrotfarmshop.service.IParrotEggNestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class ParrotEggNestService implements IGenericService<ParrotEggNestDTO> {

    @Autowired
    private ParrotRepository parrotRepository;

    @Autowired
    private ParrotEggNestRepository parrotEggNestRepository;

    @Autowired
    private ParrotEggNestConverter parrotEggNestConverter;

    @Autowired
    private Converter converter;



    @Override
    public List<ParrotEggNestDTO> findAll() {
        List<ParrotEggNestDTO> result = new ArrayList<>();
        List<ParrotEggNestEntity> parrotEggNestEntities = parrotEggNestRepository.findAll();

        for (ParrotEggNestEntity entity : parrotEggNestEntities) {
            result.add((ParrotEggNestDTO) converter.toDTO(entity, ParrotEggNestDTO.class));
        }

        return result;
    }

    @Override
    public ParrotEggNestDTO save(ParrotEggNestDTO parrotEggNestDTO) {
        ParrotEggNestEntity parrotEggNestEntity = new ParrotEggNestEntity();

        if (parrotEggNestDTO.getId() != null) {
            ParrotEggNestEntity oldEntity = parrotEggNestRepository.findOneById(parrotEggNestDTO.getId());
            parrotEggNestEntity = (ParrotEggNestEntity) converter.updateEntity(parrotEggNestDTO, oldEntity);

        } else {
            parrotEggNestEntity = (ParrotEggNestEntity) converter.toEntity(parrotEggNestDTO,ParrotEggNestEntity.class);
        }
        parrotEggNestEntity.setParrotDad(parrotRepository.findOneById(parrotEggNestDTO.getDadId()));
        parrotEggNestEntity.setParrotMom(parrotRepository.findOneById(parrotEggNestDTO.getMomId()));

        parrotEggNestRepository.save(parrotEggNestEntity);
        return (ParrotEggNestDTO) converter.toDTO(parrotEggNestEntity, ParrotEggNestDTO.class);
    }
    public void changeSaleStatus(Long id){
        ParrotEggNestEntity entity = parrotEggNestRepository.findOneById(id);
        entity.setSaleStatus(true);
        parrotEggNestRepository.save(entity);
    }


    @Override
    public void changeStatus(Long ids) {
        List<Long> idList = Arrays.asList(ids);
        parrotEggNestRepository.deleteAllById((idList));
    }
}
