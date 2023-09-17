/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eleventwell.parrotfarmshop.api;

import com.eleventwell.parrotfarmshop.output.ParrotSpeciesOutput;
import com.eleventwell.parrotfarmshop.service.IParrotSpeciesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ASUS
 */
@CrossOrigin
@RestController
@RequestMapping(value = "/api/parrot-species")
public class ParrotSpeciesAPI {
    @Autowired
    private IParrotSpeciesService parrotSpeciesService;
    
    @GetMapping(value = "") 
    public ParrotSpeciesOutput showParrotSpecies() {
        ParrotSpeciesOutput result = new ParrotSpeciesOutput();
        
        result.setListResult(parrotSpeciesService.findAll());
        return result;
    }
}
