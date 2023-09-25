package com.eleventwell.parrotfarmshop.controller;


import com.eleventwell.parrotfarmshop.dto.ParrotEggNestDTO;
import com.eleventwell.parrotfarmshop.output.ListOutput;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/parrot-egg-nest")
public class ParrotEggNestController {
    @Autowired
    private IGenericService parrotEggNestService;

    @GetMapping(value = "")
    public ListOutput showParrotEggNests() {
        ListOutput result = new ListOutput();
        result.setListResult(parrotEggNestService.findAll());
        return result;
    }
        
    //add a parrot egg nest by Post method
    @PostMapping(value = "")
    public ParrotEggNestDTO createParrotEggNest(@RequestBody ParrotEggNestDTO model){

        return (ParrotEggNestDTO) parrotEggNestService.save(model);
    }


    @PutMapping(value = "{id}")
    public ParrotEggNestDTO updateParrotEggNest(@RequestBody ParrotEggNestDTO model, @PathVariable("id") Long id) {
        model.setId(id);
       return (ParrotEggNestDTO) parrotEggNestService.save(model);
    }

    @DeleteMapping(value = "")
    public void deleteParrotEggNest(@RequestBody Long ids){
        parrotEggNestService.changeStatus(ids);
    }
}
