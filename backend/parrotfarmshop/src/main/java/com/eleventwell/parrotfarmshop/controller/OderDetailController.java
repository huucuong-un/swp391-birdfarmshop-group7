package com.eleventwell.parrotfarmshop.controller;


import com.eleventwell.parrotfarmshop.Model.OrderDetailHistoryModel;
import com.eleventwell.parrotfarmshop.dto.OrderDetailDTO;
import com.eleventwell.parrotfarmshop.service.impl.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api")
public class OderDetailController {
    @Autowired
    private OrderDetailService orderDetailService;
    @GetMapping(value="customer/orderdetail/findAllByOrderId/{id}")
    public List<OrderDetailDTO> findAllByOrderId(@RequestBody @PathVariable Long id){


        return orderDetailService.findAllByOrderId(id);

    }

    @GetMapping(value="customer/orderdetail/find-all-model-order-detail-by-id/{id}")
    public List<OrderDetailHistoryModel> findAllModelByOrderId(@RequestBody @PathVariable Long id){

        return orderDetailService.createOrderDetailHistoryModelList(id);

    }
    @GetMapping(value = "customer/orderdetail/count-sold-product/{id}")
    public Integer countSoldProduct(@RequestBody @PathVariable Long id) {
        return orderDetailService.countSoldProduct(id);
    }

}
