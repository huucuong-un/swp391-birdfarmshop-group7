package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.dto.SliderDTO;
import com.eleventwell.parrotfarmshop.entity.RoleEntity;
import com.eleventwell.parrotfarmshop.entity.SliderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SliderRepository extends JpaRepository<SliderEntity, Long> {
    SliderEntity findOneById(long id);
}
