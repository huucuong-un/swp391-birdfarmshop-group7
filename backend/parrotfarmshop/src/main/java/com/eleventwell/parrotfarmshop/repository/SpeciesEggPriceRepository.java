package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.SpeciesEggPriceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SpeciesEggPriceRepository extends JpaRepository<SpeciesEggPriceEntity,Long> {

    SpeciesEggPriceEntity findOneById(Long id);
    List<SpeciesEggPriceEntity> findAllByOrderByIdDesc();
}
