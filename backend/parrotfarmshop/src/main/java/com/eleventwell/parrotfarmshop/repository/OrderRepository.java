package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;

;
import java.util.List;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    OrderEntity findOneById(Long id);
List<OrderEntity> findAllByOrderByIdDesc(Pageable pageable);

    List<OrderEntity> findAllByUserIdOrderByIdDesc(Long id);


}
