package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.DeliveryInformationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DeliveryInformationRepository  extends JpaRepository<DeliveryInformationEntity, Long> {
    DeliveryInformationEntity findOneById(Long id);



    List<DeliveryInformationEntity> findAllByOrderByIdDesc();

    List<DeliveryInformationEntity> findAllByUserId(Long user_id);

    @Query("SELECT d FROM DeliveryInformationEntity d WHERE d.pickingStatus = true AND d.user.id = :user_id")
    DeliveryInformationEntity findOneByIdWithTruePickStatus(@Param("user_id") Long user_id);

}
