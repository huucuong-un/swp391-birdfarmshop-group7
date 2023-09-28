package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.SliderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SliderRepository extends JpaRepository<SliderEntity, Long> {
    SliderEntity findOneById(long id);
}
