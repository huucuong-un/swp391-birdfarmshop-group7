package com.eleventwell.parrotfarmshop.repository;


import com.eleventwell.parrotfarmshop.entity.PromotionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PromotionRepository extends JpaRepository<PromotionEntity, Long> {

    PromotionEntity findOneById(long id);

    List<PromotionEntity> findAllByOrderByIdDesc();
}
