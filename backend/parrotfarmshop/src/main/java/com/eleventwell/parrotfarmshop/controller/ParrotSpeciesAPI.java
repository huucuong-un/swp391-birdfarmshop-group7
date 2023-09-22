/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.dto.ParrotSpeciesDTO;
import com.eleventwell.parrotfarmshop.output.ListOutput;
import com.eleventwell.parrotfarmshop.service.IParrotSpeciesService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    public List<ParrotSpeciesDTO> showParrotSpecies() {
        ListOutput result = new ListOutput();
        
        result.setListResult(parrotSpeciesService.findAll());
        return result.getListResult();
    }
    @PostMapping(value = "")
	public ParrotSpeciesDTO createParrotSpecies(@RequestBody ParrotSpeciesDTO model) {
		return parrotSpeciesService.save(model);
	}
        @PutMapping(value = "{id}")
	public ParrotSpeciesDTO updateParrotSpecies(@RequestBody ParrotSpeciesDTO model, @PathVariable("id") long id) {
		model.setId(id);
		return parrotSpeciesService.save(model);
	}
        @DeleteMapping(value = "")
	public void deleteParrotSpecies(@RequestBody Long[] ids) {
		parrotSpeciesService.delete(ids);
	}
}
