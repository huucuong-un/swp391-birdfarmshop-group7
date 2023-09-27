package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.ParrotEggNestEntity;
import com.eleventwell.parrotfarmshop.entity.ParrotEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.data.domain.Pageable;



import java.util.List;

public interface ParrotEggNestRepository extends JpaRepository<ParrotEggNestEntity, Long> {
    ParrotEggNestEntity findOneById(Long id);

    @Query("SELECT u FROM ParrotEggNestEntity u WHERE u.status = true AND u.saleStatus = false AND u.breedStatus='Done' AND u.speciesEggPrice.parrotSpecies.id = :speciesId")
    List<ParrotEggNestEntity> findTopNByStatusIsTrue(@Param("speciesId") Long speciesId,Pageable pageable);

    Long countAllBySaleStatusAndStatusAndBreedStatusAndSpeciesEggPriceParrotSpeciesId(Boolean saleStatus,Boolean status ,String breedStatus, Long id);

}