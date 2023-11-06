package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.OrderDetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderDetailRepository extends JpaRepository<OrderDetailEntity, Long> {
    OrderDetailEntity findOneById(Long id);

    List<OrderDetailEntity> findAllByOrderIdId(Long id);
   @Query("SELECT COUNT(u)  From OrderDetailEntity u  where u.parrot.parrotSpeciesColor.parrotSpecies.id = :speciesId ")
    Integer countAllByParrotParrotSpeciesColorParrotSpeciesId(@Param("speciesId") Long speciesId);

}
