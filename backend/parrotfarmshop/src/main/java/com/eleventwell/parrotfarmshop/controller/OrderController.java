package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.dto.OrderDTO;
import com.eleventwell.parrotfarmshop.service.impl.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping(value = "")
    public List<OrderDTO> showParrots() {
        List<OrderDTO> list = orderService.findAll();
        return list;
    }

    @GetMapping(value="findAllByUserId/{id}")
    public List<OrderDTO> findAllByOrderId(@RequestBody @PathVariable Long id){


        return orderService.findAllByUserId(id);

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
    @DeleteMapping(value = "{id}")
    public void deleteParrot(@RequestBody @PathVariable("id") Long id) {
        orderService.changeStatus(id);
    }


}

