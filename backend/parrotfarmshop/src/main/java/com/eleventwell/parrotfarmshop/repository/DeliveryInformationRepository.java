package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.DeliveryInformationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DeliveryInformationRepository  extends JpaRepository<DeliveryInformationEntity, Long> {
    DeliveryInformationEntity findOneById(Long id);

    List<DeliveryInformationEntity> findAllByOrderByIdDesc();

    List<DeliveryInformationEntity> findAllByUserId(Long user_id);
}
