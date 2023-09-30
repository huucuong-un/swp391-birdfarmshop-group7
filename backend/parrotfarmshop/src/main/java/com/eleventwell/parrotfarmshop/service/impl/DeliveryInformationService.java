package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.converter.GenericConverter;
import com.eleventwell.parrotfarmshop.dto.DeliveryInformationDTO;
import com.eleventwell.parrotfarmshop.dto.ParrotEggNestDTO;
import com.eleventwell.parrotfarmshop.entity.DeliveryInformationEntity;
import com.eleventwell.parrotfarmshop.entity.ParrotEggNestEntity;
import com.eleventwell.parrotfarmshop.repository.DeliveryInformationRepository;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import jakarta.persistence.Converter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DeliveryInformationService implements IGenericService<DeliveryInformationDTO> {
    @Autowired
    GenericConverter converter;

    @Autowired
    DeliveryInformationRepository deliveryInformationRepository;


    @Override
    public List<DeliveryInformationDTO> findAll() {
        List<DeliveryInformationDTO> results = new ArrayList<>();
        List<DeliveryInformationEntity> entities = deliveryInformationRepository.findAllByOrderByIdDesc();

        for (DeliveryInformationEntity entity:
             entities) {
            results.add((DeliveryInformationDTO) converter.toDTO(entity, DeliveryInformationDTO.class));
        }


        return results;
    }

    @Override
    public DeliveryInformationDTO save(DeliveryInformationDTO deliveryInformationDTO) {
        DeliveryInformationEntity deliveryInformationEntity = new DeliveryInformationEntity();

        if (deliveryInformationDTO.getId() != null) {
            DeliveryInformationEntity oldEntity = deliveryInformationRepository.findOneById(deliveryInformationDTO.getId());
            deliveryInformationEntity = (DeliveryInformationEntity) converter.updateEntity(deliveryInformationDTO, oldEntity);

        } else {
            deliveryInformationEntity = (DeliveryInformationEntity) converter.toEntity(deliveryInformationDTO , deliveryInformationEntity.getClass());
        }

        deliveryInformationRepository.save(deliveryInformationEntity);
        return (DeliveryInformationDTO) converter.toDTO(deliveryInformationEntity, DeliveryInformationDTO.class);


    }

    @Override
    public void changeStatus(Long ids) {
        DeliveryInformationEntity deliveryInformationEntity = deliveryInformationRepository.findOneById(ids);
        if(deliveryInformationEntity.getStatus() == true ) {
            deliveryInformationEntity.setStatus(false);
        } else {
            deliveryInformationEntity.setStatus(false);
        }

        deliveryInformationRepository.save(deliveryInformationEntity);
    }

    public List<DeliveryInformationDTO> getDeliveryInformationByCustomerId(Long userId) {
        List<DeliveryInformationDTO> results = new ArrayList<>();
        List<DeliveryInformationEntity> entities = deliveryInformationRepository.findAllByUserId(userId);
        for (DeliveryInformationEntity entity: entities) {
            DeliveryInformationDTO dto = (DeliveryInformationDTO) converter.toDTO(entity, DeliveryInformationDTO.class);
            results.add(dto);
        }

        return results;
    }
}
