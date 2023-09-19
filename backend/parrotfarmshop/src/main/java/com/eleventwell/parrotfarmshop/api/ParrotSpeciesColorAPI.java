package com.eleventwell.parrotfarmshop.api;

import com.eleventwell.parrotfarmshop.dto.ParrotSpeciesColorDTO;
import com.eleventwell.parrotfarmshop.output.ListOutput;
import com.eleventwell.parrotfarmshop.service.IParrotSpeciesColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/parrot-species-color")
public class ParrotSpeciesColorAPI {
    @Autowired
    private IParrotSpeciesColorService parrotSpeciesColorService;
    
    @GetMapping(value = "") 
    public ListOutput showParrotSpeciesColors() {
        ListOutput result = new ListOutput();
        
        result.setListResult(parrotSpeciesColorService.findAll());
        return result;
    }
    
    @PostMapping(value = "")
    public ParrotSpeciesColorDTO createaPrrotSpeciesColor(@RequestBody ParrotSpeciesColorDTO model) {
        return parrotSpeciesColorService.save(model);
    }
    
    @PutMapping(value = "{id}")
    public ParrotSpeciesColorDTO updateaPrrotSpeciesColor(@RequestBody ParrotSpeciesColorDTO model, @PathVariable("id") long id) {
        model.setId(id);
        return parrotSpeciesColorService.save(model);
    }
    
    @DeleteMapping(value = "")
    public void deleteaParrotSpeciesColor(@RequestBody long[] ids) {
        parrotSpeciesColorService.delete(ids);
    }
}
