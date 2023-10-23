/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.ParrotEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 *
 * @author Admin
 */
public interface ParrotRepository extends JpaRepository<ParrotEntity, Long>{
    ParrotEntity findOneById(Long id);
    List<ParrotEntity> findAllByOrderByIdDesc();
    @Query("SELECT u FROM ParrotEntity u WHERE u.status = true AND u.healthStatus = true AND u.saleStatus = true AND u.parrotSpeciesColor.id = :colorid")
    List<ParrotEntity> findTopNByStatusIsTrue(@Param("colorid") Long colorid, Pageable pageable);

    Long countAllBySaleStatusAndStatusAndParrotSpeciesColorId(Boolean saleStatus, Boolean status, Long id);



}
