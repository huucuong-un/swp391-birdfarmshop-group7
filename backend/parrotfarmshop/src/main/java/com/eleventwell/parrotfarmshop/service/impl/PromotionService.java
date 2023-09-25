package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.converter.GenericConverter;
import com.eleventwell.parrotfarmshop.dto.PromotionDTO;
import com.eleventwell.parrotfarmshop.entity.PromotionEntity;
import com.eleventwell.parrotfarmshop.repository.PromotionRepository;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class PromotionService implements IGenericService<PromotionDTO> {


    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private GenericConverter converter;

    @Override
    public List<PromotionDTO> findAll() {
        List<PromotionDTO> result = new ArrayList<>();
        List<PromotionEntity> entities = promotionRepository.findAll();

        for (PromotionEntity entity: entities
             ) {
            PromotionDTO promotionDTO = (PromotionDTO) converter.toDTO(entity, PromotionDTO.class);
            result.add(promotionDTO);

        }
        return result;
    }

    @Override
    public PromotionDTO save(PromotionDTO promotionDTO) {
        PromotionEntity promotionEntity = new PromotionEntity();
        if(promotionDTO.getId() != null){
            PromotionEntity oldEntity = promotionRepository.findOneById(promotionDTO.getId());
            promotionEntity = (PromotionEntity) converter.updateEntity(promotionDTO, oldEntity);
        }else{
            promotionEntity = (PromotionEntity) converter.toEntity(promotionDTO, PromotionEntity.class);
        }
        promotionRepository.save(promotionEntity);
        return (PromotionDTO) converter.toDTO(promotionEntity, PromotionDTO.class);
    }

    @Override
    public void changeStatus(Long ids) {

    }



}
