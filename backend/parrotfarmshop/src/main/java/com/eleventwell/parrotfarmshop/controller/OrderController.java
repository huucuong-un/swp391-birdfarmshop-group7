package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.dto.OrderDTO;
import com.eleventwell.parrotfarmshop.output.ListOutput;
import com.eleventwell.parrotfarmshop.service.IGenericService;

import com.eleventwell.parrotfarmshop.service.impl.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping(value = "")
    public ListOutput showParrots() {
        ListOutput result = new ListOutput();
        result.setListResult(orderService.findAll());
        return result;
    }

//    @PostMapping(value = "/{parrotIds}/{nestIds}")
//    public void createOrder(
//            @RequestBody OrderDTO model,
//            @PathVariable Long[] parrotIds,
//            @PathVariable Long[] nestIds
//    ) {
//        orderService.createOrderDetail(model, parrotIds, nestIds);
//    }


    @PostMapping(value = "/{species}/{product}")
public void createOrder(@RequestBody OrderDTO dto,@PathVariable Long species,@PathVariable String product) {

    orderService.createOrderDetail(dto,species,product);
}
    @DeleteMapping(value = "")
    public void deleteParrot(@RequestBody Long ids) {
        orderService.changeStatus(ids);
    }


}

