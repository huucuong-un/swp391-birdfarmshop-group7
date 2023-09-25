package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.dto.RoleDTO;
import com.eleventwell.parrotfarmshop.dto.SpeciesEggPriceDTO;
import com.eleventwell.parrotfarmshop.output.ListOutput;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/species-egg-price")
public class SpeciesEggPriceController {
    @Autowired
    private IGenericService speciesEggPriceService;

    @GetMapping
    public ListOutput showSpeciesEggPrie() {
        ListOutput results = new ListOutput();

        results.setListResult(speciesEggPriceService.findAll());
        return results;
    }

    @PostMapping
    public SpeciesEggPriceDTO createRole(@RequestBody SpeciesEggPriceDTO model) {
        return (SpeciesEggPriceDTO) speciesEggPriceService.save(model);
    }

    //accept editing description and status only
    @PutMapping(value = "{id}")
    public RoleDTO updateRole(@RequestBody RoleDTO model, @PathVariable("id") long id) {
        model.setId(id);
        return (RoleDTO) speciesEggPriceService.save(model);
    }
}
