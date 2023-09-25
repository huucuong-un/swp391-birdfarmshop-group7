package com.eleventwell.parrotfarmshop.service;

import com.eleventwell.parrotfarmshop.dto.ParrotEggNestDTO;

import java.util.List;


public interface IParrotEggNestService {

    List<ParrotEggNestDTO> findAll();
    ParrotEggNestDTO save(ParrotEggNestDTO ParrotEggNestDTO);
    void delete(Long[] ids);

}
