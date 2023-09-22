package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.ParrotEggNestEntity;
import com.eleventwell.parrotfarmshop.entity.ParrotEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParrotEggNestRepository extends JpaRepository<ParrotEggNestEntity, Long> {
    ParrotEggNestEntity findOneById(Long id);

}
