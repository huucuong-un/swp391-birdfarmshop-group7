/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eleventwell.parrotfarmshop.service;

import com.eleventwell.parrotfarmshop.dto.ParrotDTO;
import com.eleventwell.parrotfarmshop.dto.ParrotSpeciesColorDTO;
import java.util.List;

/**
 *
 * @author Admin
 */
public interface IParrotService {
     List<ParrotDTO> findAll();
    ParrotDTO save(ParrotDTO ParrotDTO);
    void delete(Long[] ids);
}