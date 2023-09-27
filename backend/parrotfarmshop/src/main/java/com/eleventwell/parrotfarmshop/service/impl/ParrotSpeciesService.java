/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.converter.GenericConverter;
import com.eleventwell.parrotfarmshop.dto.ParrotSpeciesDTO;
import com.eleventwell.parrotfarmshop.entity.ParrotSpeciesColorEntity;
import com.eleventwell.parrotfarmshop.entity.ParrotSpeciesEntity;
//import com.eleventwell.parrotfarmshop.repository.GenericRepository;
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
    private GenericConverter genericConverter;

//    @Autowired
//    private GenericRepository<ParrotSpeciesColorEntity> genericRepository;

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
            ParrotSpeciesDTO parrotSpeciesDTO = (ParrotSpeciesDTO) genericConverter.toDTO(entity, ParrotSpeciesDTO.class);
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
        if(parrotSpeciesDTO.getStatus() == null){
            parrotSpeciesDTO.setStatus(false);
        }
        if (parrotSpeciesDTO.getId() != null) {
            ParrotSpeciesEntity oldEntity = parrotSpeciesRepository.findOneById(parrotSpeciesDTO.getId());
            parrotSpeciesEntity = (ParrotSpeciesEntity) genericConverter.updateEntity(parrotSpeciesDTO, oldEntity);
        } else {
            parrotSpeciesEntity = (ParrotSpeciesEntity) genericConverter.toEntity(parrotSpeciesDTO,parrotSpeciesEntity.getClass());
        }

        parrotSpeciesEntity = parrotSpeciesRepository.save(parrotSpeciesEntity);
        return (ParrotSpeciesDTO) genericConverter.toDTO(parrotSpeciesEntity,parrotSpeciesDTO.getClass());

    }

    @Override
    public void changeStatus(Long ids) {
       ParrotSpeciesEntity parrotSpeciesEntity = parrotSpeciesRepository.findOneById(ids);
       if(parrotSpeciesEntity.getStatus() == true){
           parrotSpeciesEntity.setStatus(false);
       }else{
           parrotSpeciesEntity.setStatus(true);
       }
       parrotSpeciesRepository.save(parrotSpeciesEntity);
    }
}
