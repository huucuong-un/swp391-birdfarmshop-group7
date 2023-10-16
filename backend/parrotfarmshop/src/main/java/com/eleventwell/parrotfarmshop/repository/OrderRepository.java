package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.OrderEntity;
import com.eleventwell.parrotfarmshop.entity.ParrotSpeciesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

;
import java.util.List;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    OrderEntity findOneById(Long id);
List<OrderEntity> findAllByOrderByIdDesc(Pageable pageable);

    List<OrderEntity> findAllByUserIdOrderByIdDesc(Long id);

    @Query("SELECT ps FROM OrderEntity ps WHERE (:email IS NULL OR ps.user.email LIKE CONCAT('%', :email, '%')) AND (:phone IS NULL OR ps.user.deliveryInformations[0].phoneNumber LIKE CONCAT('%', :phone, '%'))")

    List<OrderEntity> searchByEmailOrPhone(@Param("email") String email,@Param("phone") String phone ,Pageable pageable );

}
