package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.dto.DeliveryInformationDTO;
import com.eleventwell.parrotfarmshop.service.impl.DeliveryInformationService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/delivery-information")
public class DeliveryInformationController {
   @Autowired
    private DeliveryInformationService deliveryInformationService;

    @GetMapping(value = "{userid}")
    public List<DeliveryInformationDTO> showDeliveryInformationByCustomerId(@PathVariable("userid") Long customerId) {
        return deliveryInformationService.getDeliveryInformationByCustomerId(customerId);
    }

    @PostMapping(value = "")
    public DeliveryInformationDTO createDeliveryInformation(@RequestBody DeliveryInformationDTO model) {
        return deliveryInformationService.save(model);
    }

    @PutMapping(value = "{id}")
    public DeliveryInformationDTO updateDeliveryInformation(@RequestBody DeliveryInformationDTO model, @RequestBody Long id) {
        model.setId(id);
        return deliveryInformationService.save(model);

    } 

}
