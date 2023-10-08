/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.ParrotSpeciesEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * @author ASUS
 */
public interface ParrotSpeciesRepository extends JpaRepository<ParrotSpeciesEntity, Long> {

    ParrotSpeciesEntity findOneById(long id);

    List<ParrotSpeciesEntity> findAllByNameLike(String name);

    @Query("SELECT ps FROM ParrotSpeciesEntity ps WHERE (:name IS NULL OR ps.name LIKE %:name%)  " +
            "ORDER BY "+
            "CASE WHEN :sortPrice = 'ASC'  THEN (SELECT MIN(psc.price) FROM ps.parrotSpeciesColors psc WHERE ps.id = psc.parrotSpecies.id) END ASC, " +
            "CASE WHEN :sortPrice = 'DESC' THEN (SELECT MIN(psc.price) FROM ps.parrotSpeciesColors psc  WHERE ps.id = psc.parrotSpecies.id  ) END DESC "
    )
    List<ParrotSpeciesEntity> findAllByPriceAndName(@Param("name") String name,@Param("sortPrice") String sortPrice,Pageable pageable  );

    List<ParrotSpeciesEntity> findAllByOrderByIdDesc(Pageable pageable);


}
