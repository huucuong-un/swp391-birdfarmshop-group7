package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.converter.GenericConverter;
import com.eleventwell.parrotfarmshop.dto.SliderDTO;
import com.eleventwell.parrotfarmshop.entity.SliderEntity;
import com.eleventwell.parrotfarmshop.repository.SliderRepository;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SliderService implements IGenericService<SliderDTO> {

    @Autowired
    SliderRepository sliderRepository;

    @Autowired
    private GenericConverter genericConverter;

    @Override
    public List<SliderDTO> findAll() {
        List<SliderDTO> result = new ArrayList<>();
        List<SliderEntity> sliderEntities = sliderRepository.findAll();

        for (SliderEntity entity : sliderEntities
        ) {
            SliderDTO sliderDTO = (SliderDTO) genericConverter.toDTO(entity, SliderDTO.class);
            result.add(sliderDTO);

        }
        return result;
    }

    @Override
    public SliderDTO save(SliderDTO sliderDTO) {
        SliderEntity sliderEntity = new SliderEntity();
        if (sliderDTO.getId() != null) {
            SliderEntity oldEntity = sliderRepository.findOneById(sliderDTO.getId());
            sliderEntity = (SliderEntity) genericConverter.updateEntity(sliderDTO, oldEntity);
        } else {
            sliderEntity = (SliderEntity) genericConverter.toEntity(sliderDTO, SliderEntity.class);
        }
        sliderRepository.save(sliderEntity);
        return (SliderDTO) genericConverter.toDTO(sliderEntity, SliderDTO.class);
    }

    @Override
    public void changeStatus(Long ids) {
        SliderEntity sliderEntity = sliderRepository.findOneById(ids);
        if (sliderEntity.getStatus() == true) {
            sliderEntity.setStatus(false);
        } else {
            sliderEntity.setStatus(true);
        }
        sliderRepository.save(sliderEntity);
    }
}
