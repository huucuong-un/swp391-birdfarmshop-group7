/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eleventwell.parrotfarmshop.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import com.eleventwell.parrotfarmshop.Model.PagingModel;
import com.eleventwell.parrotfarmshop.dto.ParrotDTO;
import com.eleventwell.parrotfarmshop.entity.ParrotEntity;
import com.eleventwell.parrotfarmshop.output.ListOutput;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import com.eleventwell.parrotfarmshop.service.impl.ParrotService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author Admin
 */
@CrossOrigin
@RestController
@RequestMapping(value = "/api/parrot")
public class ParrotController {

     @Autowired
    private ParrotService parrotService;
     
     @GetMapping(value="")
     public List<ParrotDTO> showParrots(){
      List<ParrotDTO> result = parrotService.findAll();
      return  result;
     }
    @GetMapping(value="/count-available-parrot-quantity-spcies-by-id/{id}")
    public Long countAvaiableParrotById(@RequestBody @PathVariable("id") long id){

        return parrotService.countAvaiableParrotById(id);
    }


     
       @PostMapping(value="")
      public ParrotDTO createParrot(@RequestBody ParrotDTO model){
         
         return (ParrotDTO) parrotService.save(model);
     }
     
     @PutMapping(value="{id}")
     public ParrotDTO updateParrot(@RequestBody ParrotDTO model,@PathVariable("id") long id){
         model.setId(id);
         return (ParrotDTO) parrotService.save(model);
     }
     
//        @DeleteMapping(value = "")
//	public void deleteParrot(@RequestBody Long[] ids) {
//		parrotService.delete(ids);
//	}

    @DeleteMapping(value = "{id}")
    public void changeStatus(@RequestBody @PathVariable("id") Long id){
         parrotService.changeStatus(id);
    }
     
    @DeleteMapping(value = "change-sale-status/{id}")
    public void changeSaleStatus(@RequestBody @PathVariable("id") Long id){
         parrotService.changeSaleStatus(id);
    }

    @DeleteMapping(value = "change-health-status/{id}")
    public void changeHealthStatus(@RequestBody @PathVariable("id") Long id){
         parrotService.changeHealthStatus(id);
    }
    @DeleteMapping(value = "change-pregnancy-status/{id}")
    public void changePregnancyStatus(@RequestBody @PathVariable("id") Long id){
         parrotService.changePregnancyStatus(id);
    }
     
     
}
