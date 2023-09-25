package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.dto.SpeciesEggPriceDTO;
import com.eleventwell.parrotfarmshop.entity.SpeciesEggPriceEntity;
import com.eleventwell.parrotfarmshop.repository.ParrotSpeciesRepository;
import com.eleventwell.parrotfarmshop.repository.SpeciesEggPriceRepository;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.eleventwell.parrotfarmshop.converter.Converter;

import java.util.ArrayList;
import java.util.List;

@Service
public class SpeciesEggPriceService implements IGenericService<SpeciesEggPriceDTO> {
@Autowired
    SpeciesEggPriceRepository speciesEggPriceRepository;

    @Autowired
    ParrotSpeciesRepository parrotSpeciesRepository;

@Autowired
Converter converter;

    @Override
    public List<SpeciesEggPriceDTO> findAll() {
        List<SpeciesEggPriceEntity> speciesEggPrices = speciesEggPriceRepository.findAll();
        List<SpeciesEggPriceDTO> speciesEggPriceDTOs =  new ArrayList<>();

        for (SpeciesEggPriceEntity entity : speciesEggPrices) {
            SpeciesEggPriceDTO dto = (SpeciesEggPriceDTO) converter.toDTO(entity, SpeciesEggPriceDTO.class);
            speciesEggPriceDTOs.add(dto);
        }
        return speciesEggPriceDTOs;

    }

    @Override
    public SpeciesEggPriceDTO save(SpeciesEggPriceDTO dto) {
SpeciesEggPriceEntity speciesEggPriceEntity = new SpeciesEggPriceEntity();
if(dto.getId() !=null){
    SpeciesEggPriceEntity oldEntity = speciesEggPriceRepository.findOneById(dto.getId());
    speciesEggPriceEntity = (SpeciesEggPriceEntity) converter.updateEntity(dto,oldEntity);
}else{
    speciesEggPriceEntity = (SpeciesEggPriceEntity) converter.toEntity(dto,speciesEggPriceEntity.getClass());
}
speciesEggPriceEntity.setParrotSpecies(parrotSpeciesRepository.findOneById(dto.getSpeciesId()));
speciesEggPriceRepository.save(speciesEggPriceEntity);
return (SpeciesEggPriceDTO) converter.toDTO(speciesEggPriceEntity, SpeciesEggPriceDTO.class);
    }

    @Override
    public void changeStatus(Long ids) {

    }
}
