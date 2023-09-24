package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.converter.Converter;
import com.eleventwell.parrotfarmshop.dto.UserDTO;
import com.eleventwell.parrotfarmshop.repository.GenericsRepository;
import com.eleventwell.parrotfarmshop.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class UserService implements IUserService {
    @Autowired
    Converter converter;

    @Autowired
    GenericsRepository genericsRepository;

    @Override
    public List<UserDTO> findAll() {
        return null;
    }

    @Override
    public UserDTO save(UserDTO dto) {
        return null;
    }
}
