package com.eleventwell.parrotfarmshop.repository;


import com.eleventwell.parrotfarmshop.entity.PromotionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface PromotionRepository extends JpaRepository<PromotionEntity, Long> {

    PromotionEntity findOneById(long id);

    List<PromotionEntity> findAllByOrderByIdDesc();


    @Query ("SELECT p FROM PromotionEntity p WHERE p.code = :code AND p.quantity > 0")
    PromotionEntity findOneByCodeAndCheckValidDate(@Param("code")String code);

    @Query ("SELECT p FROM PromotionEntity p WHERE p.id = :id AND p.quantity > 0")
    PromotionEntity findOneByIdAndCheckValidDate(@Param("id")Long id);

}
