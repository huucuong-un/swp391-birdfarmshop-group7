/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.ParrotSpeciesEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 *
 * @author ASUS
 */
public interface ParrotSpeciesRepository extends JpaRepository<ParrotSpeciesEntity, Long>{

   	ParrotSpeciesEntity findOneById(long id);

	   List<ParrotSpeciesEntity> findAllByOrderByIdDesc();
    
}
