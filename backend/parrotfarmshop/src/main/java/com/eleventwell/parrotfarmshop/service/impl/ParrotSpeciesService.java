/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.converter.Converter;
import com.eleventwell.parrotfarmshop.dto.ParrotSpeciesDTO;
import com.eleventwell.parrotfarmshop.entity.ParrotSpeciesEntity;
import com.eleventwell.parrotfarmshop.repository.ParrotSpeciesRepository;
import com.eleventwell.parrotfarmshop.service.IGenericService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ASUS
 */
@Service
public class ParrotSpeciesService implements IGenericService<ParrotSpeciesDTO> {

    @Autowired
    private ParrotSpeciesRepository parrotSpeciesRepository;

    @Autowired
    private Converter converter;

    /*
    * findAll()
    * Hàm này dùng để hiển thị tất cả loài
    * lấy danh sách species bằng parrotSpeciesRepository.findAll()
    * duyệt list species(entity) và convert từ entity sang DTO
    * */
    @Override
    public List<ParrotSpeciesDTO> findAll() {
        List<ParrotSpeciesDTO> results = new ArrayList<>();
        List<ParrotSpeciesEntity> entities = parrotSpeciesRepository.findAll();

        for (ParrotSpeciesEntity entity : entities) {
            //NOTE
            ParrotSpeciesDTO parrotSpeciesDTO = (ParrotSpeciesDTO) converter.toDTO(entity, ParrotSpeciesDTO.class);
            results.add(parrotSpeciesDTO);
        }

        return results;
    }
/*
* Save()
* Hàm này dùng để add và update
* truyền vào một DTO
*tạo một entity
*kiểm tra DTO truyền vào có ID hay không
* nếu không thì convert DTO sang entity và thực thi hàm save để lưu vào database
* nếu có Id thì tạo một oldEntity để lưu trữ entity có Id tương ứng
* sau đó truyền DTO và oldEntity để thực thi hàm convert-update
* thực thi hàm save để lưu vào database
* */
    @Override
    public ParrotSpeciesDTO save(ParrotSpeciesDTO parrotSpeciesDTO) {
        ParrotSpeciesEntity parrotSpeciesEntity = new ParrotSpeciesEntity();

        if (parrotSpeciesDTO.getId() != null) {
            ParrotSpeciesEntity oldEntity = parrotSpeciesRepository.findOneById(parrotSpeciesDTO.getId());
            parrotSpeciesEntity = (ParrotSpeciesEntity) converter.updateEntity(parrotSpeciesDTO, oldEntity);
        } else {
            parrotSpeciesEntity = (ParrotSpeciesEntity) converter.toEntity(parrotSpeciesDTO,parrotSpeciesEntity.getClass());
        }

        parrotSpeciesEntity = parrotSpeciesRepository.save(parrotSpeciesEntity);
        return (ParrotSpeciesDTO) converter.toDTO(parrotSpeciesEntity,parrotSpeciesDTO.getClass());

    }

    @Override
    public void changeStatus(Long ids) {
        List<Long> idList = Arrays.asList(ids);
        parrotSpeciesRepository.deleteAllById((idList));


//        for (long item : ids) {
//            parrotSpeciesRepository.deleteById(item);
//        }

    }
}
