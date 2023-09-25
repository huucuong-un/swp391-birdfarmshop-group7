package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.dto.PromotionDTO;
import com.eleventwell.parrotfarmshop.output.ListOutput;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/promotion")
public class PromotionAPI {

    @Autowired
    IPromotionService promotionService;

    @GetMapping(value= "")
    public ListOutput show(){
        ListOutput result = new ListOutput();
        result.setListResult(promotionService.findAll());
        return  result;

    }

    @PostMapping(value= "")
    public PromotionDTO create(@RequestBody PromotionDTO model){
        return promotionService.save(model);
    }

    @PutMapping(value= "{id}")
    public PromotionDTO update(@RequestBody PromotionDTO model, @PathVariable("id") long id){
        model.setId(id);
        return promotionService.save(model);
    }

    @DeleteMapping(value = "")
    public void delete(@RequestBody long[] ids){
        promotionService.delete(ids);
    }


}
