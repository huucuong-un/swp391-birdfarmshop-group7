package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.dto.ParrotSpeciesColorDTO;
import com.eleventwell.parrotfarmshop.dto.ParrotSpeciesDTO;
import com.eleventwell.parrotfarmshop.output.ListOutput;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import com.eleventwell.parrotfarmshop.service.impl.ParrotSpeciesColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/parrot-species-color")
public class ParrotSpeciesColorController {
    @Autowired
    private ParrotSpeciesColorService parrotSpeciesColorService;
    
    @GetMapping(value = "") 
    public List<ParrotSpeciesColorDTO> showParrotSpeciesColors() {
        ListOutput result = new ListOutput();
        
        result.setListResult(parrotSpeciesColorService.findAll());
        return result.getListResult();
    }

    @GetMapping(value = "find-by-parrot-species-id/{id}")
    public ListOutput getParrotSpeciesColorsBySpeciesId(@PathVariable("id") Long id) {
        ListOutput result = new ListOutput();

        result.setListResult(parrotSpeciesColorService.findAllBySpeciesId(id));
        return result;
    }

    @PostMapping(value = "")
    public ParrotSpeciesColorDTO createaPrrotSpeciesColor(@RequestBody ParrotSpeciesColorDTO model) {
        return (ParrotSpeciesColorDTO) parrotSpeciesColorService.save(model);
    }
    
    @PutMapping(value = "{id}")
    public ParrotSpeciesColorDTO updateaPrrotSpeciesColor(@RequestBody ParrotSpeciesColorDTO model, @PathVariable("id") long id) {
        model.setId(id);
        return (ParrotSpeciesColorDTO) parrotSpeciesColorService.save(model);
    }
    
    @DeleteMapping(value = "")
    public void deleteaParrotSpeciesColor(@RequestBody Long id) {
        parrotSpeciesColorService.changeStatus(id);
    }
}
