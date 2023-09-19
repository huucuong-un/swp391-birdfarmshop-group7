/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eleventwell.parrotfarmshop.service;

import com.eleventwell.parrotfarmshop.dto.ParrotSpeciesColorDTO;
import com.eleventwell.parrotfarmshop.dto.ParrotSpeciesDTO;
import java.util.List;

/**
 *
 * @author Admin
 */
public interface IParrotSpeciesColorService {
     List<ParrotSpeciesColorDTO> findAll();
    ParrotSpeciesColorDTO save(ParrotSpeciesColorDTO parrotSpeciesColorDTO);
    void delete(long[] ids);
}
