package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.RoleEntity;
import com.eleventwell.parrotfarmshop.entity.SpeciesEggPriceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpeciesEggPriceRepository extends JpaRepository<SpeciesEggPriceEntity,Long> {

    SpeciesEggPriceEntity findOneById(Long id);
}
