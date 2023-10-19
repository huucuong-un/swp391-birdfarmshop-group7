package com.eleventwell.parrotfarmshop.controller;


import com.eleventwell.parrotfarmshop.dto.NestDTO;
import com.eleventwell.parrotfarmshop.output.ListOutput;
import com.eleventwell.parrotfarmshop.service.impl.NestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/parrot-egg-nest")
public class NestController {
    @Autowired
    private NestService nestService;

    @GetMapping(value = "")
    public ListOutput showParrotEggNests() {
        ListOutput result = new ListOutput();
        result.setListResult(nestService.findAll());
        return result;
    }

        
    //add a parrot egg nest by Post method
    @PostMapping(value = "")
    public NestDTO createParrotEggNest(@RequestBody NestDTO model){

        return (NestDTO) nestService.save(model);
    }


    @PutMapping(value = "{id}")
    public NestDTO updateParrotEggNest(@RequestBody NestDTO model, @PathVariable("id") Long id) {
        model.setId(id);
       return (NestDTO) nestService.save(model);
    }

    @DeleteMapping(value = "{id}")
    public void deleteParrotEggNest(@RequestBody @PathVariable("id") Long id){
        nestService.changeStatus(id);
    }



//    @DeleteMapping(value = "change-sale-status/{id}")
//    public void changeSaleStatus(@RequestBody @PathVariable("id") Long id){
//        parrotEggNestService.changeSaleStatus(id);
//    }

//    @DeleteMapping(value = "change-breed-status/{id}")
//    public void changeBreedStatus(@RequestBody @PathVariable("id") Long id){
//        parrotEggNestService.changeBreedStatus(id);
//    }
}

