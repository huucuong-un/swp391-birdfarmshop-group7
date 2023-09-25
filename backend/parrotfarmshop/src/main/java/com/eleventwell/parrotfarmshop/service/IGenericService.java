package com.eleventwell.parrotfarmshop.service;

import com.eleventwell.parrotfarmshop.dto.ParrotEggNestDTO;
import org.springframework.context.annotation.Scope;

import java.util.List;

public interface IGenericService<T> {
    List<T> findAll();
    T save(T DTO);

    void changeStatus(Long ids);
}
