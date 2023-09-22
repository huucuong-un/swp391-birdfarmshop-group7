/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.dto.ParrotDTO;
import com.eleventwell.parrotfarmshop.output.ListOutput;
import com.eleventwell.parrotfarmshop.service.IParrotService;
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
 * @author Admin
 */
@CrossOrigin
@RestController
@RequestMapping(value = "/api/parrot")
public class ParrotController {
     @Autowired
    private IParrotService parrotService;
     
     @GetMapping(value="")
     public ListOutput showParrots(){
      ListOutput result = new ListOutput();
      result.setListResult(parrotService.findAll());
      return  result;
     }
     
       @PostMapping(value="")
      public ParrotDTO createParrot(@RequestBody ParrotDTO model){
         
         return parrotService.save(model);
     }
     
     @PutMapping(value="{id}")
     public ParrotDTO updateParrot(@RequestBody ParrotDTO model,@PathVariable("id") long id){
         model.setId(id);
         return parrotService.save(model);
     }
     
        @DeleteMapping(value = "")
	public void deleteParrot(@RequestBody Long[] ids) {
		parrotService.delete(ids);
	}
     
   
     
     
}
