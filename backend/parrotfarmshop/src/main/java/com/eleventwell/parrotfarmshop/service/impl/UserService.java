package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.converter.GenericConverter;
import com.eleventwell.parrotfarmshop.dto.UserDTO;
import com.eleventwell.parrotfarmshop.entity.UserEntity;
import com.eleventwell.parrotfarmshop.repository.UserRepository;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService implements IGenericService<UserDTO> {
    @Autowired
    GenericConverter genericConverter;


    @Autowired
    UserRepository userRepository;

    //find all users
    @Override
    public List<UserDTO> findAll() {
        List<UserDTO> results = new ArrayList<>();
        List<UserEntity> entities = userRepository.findAll();
        for (UserEntity entity:
             entities) {
            UserDTO userDTO = (UserDTO) genericConverter.toDTO(entity, UserDTO.class);
            results.add(userDTO);
        }
        return results;
    }


    @Override
    public UserDTO save(UserDTO dto) {
        UserEntity userEntity = new UserEntity();
        if(dto.getId() == null) {   //if user did not exist before -> create a userEntity for insert database action
            userEntity = (UserEntity) genericConverter.toEntity(dto, userEntity.getClass());
        } else {
            UserEntity oldUserEntity = userRepository.findOneById(dto.getId());
            userEntity =  (UserEntity) genericConverter.updateEntity(dto, oldUserEntity);
            //if user exists -> update user's info
            //           convert UserDTO to UserEntity for updating info to database
        }

        userRepository.save(userEntity);    //save entity to database !!

        return (UserDTO) genericConverter.toDTO(userEntity, dto.getClass());
    }

    @Override
    public void changeStatus(Long ids) {

    }
}
