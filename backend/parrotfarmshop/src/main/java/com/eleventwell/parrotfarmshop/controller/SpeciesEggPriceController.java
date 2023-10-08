package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.dto.RoleDTO;
import com.eleventwell.parrotfarmshop.dto.SpeciesEggPriceDTO;
import com.eleventwell.parrotfarmshop.output.ListOutput;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import com.eleventwell.parrotfarmshop.service.impl.SpeciesEggPriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/species-egg-price")
public class SpeciesEggPriceController {
    @Autowired
    private SpeciesEggPriceService speciesEggPriceService;

    @GetMapping
    public List<SpeciesEggPriceDTO> showSpeciesEggPrie() {
        List<SpeciesEggPriceDTO> results = new ArrayList<>();

        results = (speciesEggPriceService.findAll());
        return results;
    }
    @GetMapping(value = "find-by-species-id/{speciesId}")
    public List<SpeciesEggPriceDTO> findBySpeciesId(@RequestBody @PathVariable("speciesId") Long id) {
        List<SpeciesEggPriceDTO> results = new ArrayList<>();

        results = (speciesEggPriceService.findAllBySpeciesId(id));
        return results;
    }


    @PostMapping
    public SpeciesEggPriceDTO createRole(@RequestBody SpeciesEggPriceDTO model) {
        return (SpeciesEggPriceDTO) speciesEggPriceService.save(model);
    }

    //accept editing description and status only
    @PutMapping(value = "{id}")
    public SpeciesEggPriceDTO updateRole(@RequestBody SpeciesEggPriceDTO model, @PathVariable("id") long id) {
        model.setId(id);
        return (SpeciesEggPriceDTO) speciesEggPriceService.save(model);
    }

    @DeleteMapping(value = "{id}")
    public void changeStatus(@RequestBody @PathVariable("id") long id){
        speciesEggPriceService.changeStatus(id);
    }
}
