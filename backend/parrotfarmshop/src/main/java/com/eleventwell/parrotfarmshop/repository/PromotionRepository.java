package com.eleventwell.parrotfarmshop.repository;


import com.eleventwell.parrotfarmshop.entity.PromotionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PromotionRepository extends JpaRepository<PromotionEntity, Long> {

    PromotionEntity findOneById(long id);
}
