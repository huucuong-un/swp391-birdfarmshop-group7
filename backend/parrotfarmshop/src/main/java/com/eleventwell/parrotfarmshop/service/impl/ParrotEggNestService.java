package com.eleventwell.parrotfarmshop.service.impl;

//import com.eleventwell.parrotfarmshop.converter.ParrotConverter;


import com.eleventwell.parrotfarmshop.converter.GenericConverter;
import com.eleventwell.parrotfarmshop.dto.ParrotEggNestDTO;
import com.eleventwell.parrotfarmshop.entity.ParrotEggNestEntity;
import com.eleventwell.parrotfarmshop.repository.ParrotEggNestRepository;
import com.eleventwell.parrotfarmshop.repository.ParrotRepository;
import com.eleventwell.parrotfarmshop.service.IGenericService;
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
    GenericConverter genericConverter;



    @Override
    public List<ParrotEggNestDTO> findAll() {
        List<ParrotEggNestDTO> result = new ArrayList<>();
        List<ParrotEggNestEntity> parrotEggNestEntities = parrotEggNestRepository.findAll();

        for (ParrotEggNestEntity entity : parrotEggNestEntities) {
            result.add((ParrotEggNestDTO) genericConverter.toDTO(entity, ParrotEggNestDTO.class));
        }

        return result;
    }

    @Override
    public ParrotEggNestDTO save(ParrotEggNestDTO parrotEggNestDTO) {
        ParrotEggNestEntity parrotEggNestEntity = new ParrotEggNestEntity();

        if (parrotEggNestDTO.getId() != null) {
            ParrotEggNestEntity oldEntity = parrotEggNestRepository.findOneById(parrotEggNestDTO.getId());
            parrotEggNestEntity = (ParrotEggNestEntity) genericConverter.updateEntity(parrotEggNestDTO, oldEntity);

        } else {
            parrotEggNestEntity = (ParrotEggNestEntity) genericConverter.toEntity(parrotEggNestDTO,ParrotEggNestEntity.class);
        }
        parrotEggNestEntity.setParrotDad(parrotRepository.findOneById(parrotEggNestDTO.getDadId()));
        parrotEggNestEntity.setParrotMom(parrotRepository.findOneById(parrotEggNestDTO.getMomId()));

        parrotEggNestRepository.save(parrotEggNestEntity);
        return (ParrotEggNestDTO) genericConverter.toDTO(parrotEggNestEntity, ParrotEggNestDTO.class);
    }
    public void changeSaleStatus(Long id){
        ParrotEggNestEntity entity = parrotEggNestRepository.findOneById(id);
        entity.setSaleStatus(true);
        parrotEggNestRepository.save(entity);
    }

    public Long countAvaiableNestById(Long id){
        return parrotEggNestRepository.countAllBySaleStatusAndStatusAndSpeciesEggPriceParrotSpeciesId(false,"Done",id);
    }


    @Override
    public void changeStatus(Long ids) {
        List<Long> idList = Arrays.asList(ids);
        parrotEggNestRepository.deleteAllById((idList));
    }
}
