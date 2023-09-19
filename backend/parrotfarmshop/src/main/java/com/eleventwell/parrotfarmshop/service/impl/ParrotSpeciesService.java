/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.converter.ParrotSpeciesConverter;
import com.eleventwell.parrotfarmshop.dto.ParrotSpeciesDTO;
import com.eleventwell.parrotfarmshop.entity.ParrotSpeciesEntity;
import com.eleventwell.parrotfarmshop.repository.ParrotSpeciesRepository;
import com.eleventwell.parrotfarmshop.service.IParrotSpeciesService;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ASUS
 */

@Service
public class ParrotSpeciesService implements IParrotSpeciesService{
    @Autowired
    private ParrotSpeciesRepository parrotSpeciesRepository;
    
    @Autowired
    private ParrotSpeciesConverter parrotSpeciesConverter;
    
  

    @Override
    public List<ParrotSpeciesDTO> findAll() {
       List<ParrotSpeciesDTO> results = new ArrayList<>();
       List<ParrotSpeciesEntity> entities = parrotSpeciesRepository.findAll();
       
        for (ParrotSpeciesEntity entity : entities) {
            ParrotSpeciesDTO parrotSpeciesDTO = parrotSpeciesConverter.toDTO(entity);
            results.add(parrotSpeciesDTO);
        }
        
        return results;
    }

    @Override
    public ParrotSpeciesDTO save(ParrotSpeciesDTO parrotSpeciesDTO) {
ParrotSpeciesEntity parrotSpeciesEntity = new ParrotSpeciesEntity();
                if(parrotSpeciesDTO.getParrotSpeciesAverageWeight() < 0 && parrotSpeciesDTO.getParrotSpeciesAverageWeight() > 2 ){
                    return null;
                }
		if (parrotSpeciesDTO.getId() != null) {
			ParrotSpeciesEntity oldNewEntity = parrotSpeciesRepository.findOneById(parrotSpeciesDTO.getId());
			parrotSpeciesEntity = parrotSpeciesConverter.toEntity(parrotSpeciesDTO, oldNewEntity);
		} else {
			parrotSpeciesEntity = parrotSpeciesConverter.toEntity(parrotSpeciesDTO);
		}

		parrotSpeciesEntity = parrotSpeciesRepository.save(parrotSpeciesEntity);
		return parrotSpeciesConverter.toDTO(parrotSpeciesEntity);

    }

    @Override
    public void delete(long[] ids) {
    for(long item: ids) {
		parrotSpeciesRepository.deleteById(item);
	}
	
	}
}
