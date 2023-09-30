package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.SliderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SliderRepository extends JpaRepository<SliderEntity, Long> {
    SliderEntity findOneById(long id);
    List<SliderEntity> findAllByOrderByIdDesc();
}
