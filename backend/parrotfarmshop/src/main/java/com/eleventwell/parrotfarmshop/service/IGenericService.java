package com.eleventwell.parrotfarmshop.service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.eleventwell.parrotfarmshop.dto.ParrotEggNestDTO;
import org.springframework.context.annotation.Scope;

import java.util.List;

public interface IGenericService<T> {
    List<T> findAll();
    T save(T DTO);

    void changeStatus(Long ids);
    int totalItem();

    List<T> findAll(Pageable pageable);
}
