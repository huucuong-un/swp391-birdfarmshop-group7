package com.eleventwell.parrotfarmshop.service.impl;

//import com.eleventwell.parrotfarmshop.converter.ParrotConverter;
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
    private ParrotEggNestConverter parrotEggNestConverter;

    @Override
    public List<ParrotEggNestDTO> findAll() {
        List<ParrotEggNestDTO> result = new ArrayList<>();
        List<ParrotEggNestEntity> parrotEggNestEntities = parrotEggNestRepository.findAll();

        for (ParrotEggNestEntity entity : parrotEggNestEntities) {
            result.add(parrotEggNestConverter.toDTO(entity));
        }

        return result;
    }

    @Override
    public ParrotEggNestDTO save(ParrotEggNestDTO parrotEggNestDTO) {
        ParrotEggNestEntity parrotEggNestEntity = new ParrotEggNestEntity();

        if (parrotEggNestDTO.getId() != null) {
            ParrotEggNestEntity oldEntity = parrotEggNestRepository.findOneById(parrotEggNestDTO.getId());
            parrotEggNestEntity = parrotEggNestConverter.toEntity(parrotEggNestDTO, oldEntity);

        } else {
            parrotEggNestEntity = parrotEggNestConverter.toEntity(parrotEggNestDTO);
        }
        parrotEggNestEntity.setParrotDad(parrotRepository.findOneById(parrotEggNestDTO.getDadId()));
        parrotEggNestEntity.setParrotMom(parrotRepository.findOneById(parrotEggNestDTO.getMomId()));

        parrotEggNestRepository.save(parrotEggNestEntity);
        return parrotEggNestConverter.toDTO(parrotEggNestEntity);
    }



    @Override
    public void changeStatus(Long ids) {
        List<Long> idList = Arrays.asList(ids);
        parrotEggNestRepository.deleteAllById((idList));
    }
}
