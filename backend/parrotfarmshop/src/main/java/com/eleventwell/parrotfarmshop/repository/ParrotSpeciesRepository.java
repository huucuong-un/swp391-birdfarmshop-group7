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

    @Query("SELECT ps FROM ParrotSpeciesEntity ps " +
            "ORDER BY "+
            "CASE WHEN :sortWay = 'PASC'  THEN (SELECT MIN(psc.price) FROM ps.parrotSpeciesColors psc WHERE ps.id = psc.parrotSpecies.id) END ASC, " +
            "CASE WHEN :sortWay = 'PDESC' THEN (SELECT MIN(psc.price) FROM ps.parrotSpeciesColors psc  WHERE ps.id = psc.parrotSpecies.id  ) END DESC, "+
            "CASE WHEN :sortWay = 'NASC' THEN substring(ps.name,1,1) END ASC , "+
            "CASE WHEN :sortWay = 'NDESC' THEN substring(ps.name,1,1) END DESC "
    )
    List<ParrotSpeciesEntity> findAllByPriceAndName(@Param("sortWay") String sortWay,Pageable pageable  );

    List<ParrotSpeciesEntity> findAllByOrderByIdDesc(Pageable pageable);


}
