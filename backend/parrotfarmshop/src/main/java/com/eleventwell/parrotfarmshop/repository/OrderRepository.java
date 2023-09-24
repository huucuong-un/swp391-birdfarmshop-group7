package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.OrderEntity;
import com.eleventwell.parrotfarmshop.entity.ParrotEggNestEntity;
import com.eleventwell.parrotfarmshop.entity.ParrotEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    OrderEntity findOneById(Long id);

}
