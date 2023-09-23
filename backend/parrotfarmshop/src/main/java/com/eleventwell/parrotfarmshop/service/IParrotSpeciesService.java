/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eleventwell.parrotfarmshop.service;

import com.eleventwell.parrotfarmshop.dto.ParrotSpeciesDTO;
import java.util.List;

/**
 *
 * @author ASUS
 */
public interface IParrotSpeciesService {
    List<ParrotSpeciesDTO> findAll();
    ParrotSpeciesDTO save(ParrotSpeciesDTO parrotSpeciesDTO);
    void delete(Long[] ids);
}
