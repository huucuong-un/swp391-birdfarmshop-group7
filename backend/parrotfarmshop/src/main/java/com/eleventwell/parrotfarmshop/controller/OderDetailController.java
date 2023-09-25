//package com.eleventwell.parrotfarmshop.controller;
//
//
//import com.eleventwell.parrotfarmshop.dto.OrderDetailDTO;
//import com.eleventwell.parrotfarmshop.dto.ParrotDTO;
//import com.eleventwell.parrotfarmshop.output.ListOutput;
//import com.eleventwell.parrotfarmshop.service.IGenericService;
//import com.eleventwell.parrotfarmshop.service.IParrotService;
//import com.eleventwell.parrotfarmshop.service.impl.OrderDetailService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@CrossOrigin
//@RestController
//@RequestMapping(value = "/api/orderdetail")
//public class OderDetailController {
//    @Autowired
//    private IGenericService orderDetailService;
//    @PostMapping(value="")
//    public OrderDetailDTO createParrot(@RequestBody OrderDetailDTO model){
//
//        return (OrderDetailDTO)orderDetailService.save(model);
//    }
//
//}
