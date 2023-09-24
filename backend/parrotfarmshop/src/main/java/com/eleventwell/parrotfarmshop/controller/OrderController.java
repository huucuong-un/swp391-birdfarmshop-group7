package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.dto.OrderDTO;
import com.eleventwell.parrotfarmshop.dto.ParrotDTO;
import com.eleventwell.parrotfarmshop.output.ListOutput;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import com.eleventwell.parrotfarmshop.service.IParrotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/order")
public class OrderController {
    @Autowired
    private IGenericService orderService;

    @GetMapping(value="")
    public ListOutput showParrots(){
        ListOutput result = new ListOutput();
        result.setListResult(orderService.findAll());
        return  result;
    }

    @PostMapping(value="")
    public OrderDTO createParrot(@RequestBody OrderDTO model){

        return (OrderDTO) orderService.save(model);
    }



    @DeleteMapping(value = "")
    public void deleteParrot(@RequestBody Long ids) {orderService.changeStatus(ids);
    }




}

