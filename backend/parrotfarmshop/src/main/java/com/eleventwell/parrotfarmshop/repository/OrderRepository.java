package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    OrderEntity findOneById(Long id);


    List<OrderEntity> findAllByUserId(Long id);
}
