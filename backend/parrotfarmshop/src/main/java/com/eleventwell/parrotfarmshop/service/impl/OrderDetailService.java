package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.converter.Converter;
import com.eleventwell.parrotfarmshop.dto.OrderDetailDTO;
import com.eleventwell.parrotfarmshop.entity.OrderDetailEntity;
import com.eleventwell.parrotfarmshop.entity.OrderEntity;
import com.eleventwell.parrotfarmshop.entity.ParrotEggNestEntity;
import com.eleventwell.parrotfarmshop.entity.ParrotEntity;
import com.eleventwell.parrotfarmshop.repository.OrderDetailRepository;
import com.eleventwell.parrotfarmshop.repository.OrderRepository;
import com.eleventwell.parrotfarmshop.repository.ParrotEggNestRepository;
import com.eleventwell.parrotfarmshop.repository.ParrotRepository;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import com.eleventwell.parrotfarmshop.service.IOrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;

@Service
public class OrderDetailService implements IGenericService<OrderDetailDTO> {

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private Converter converter;

    @Autowired
    private ParrotRepository parrotRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ParrotEggNestRepository parrotEggNestRepository;

    @Override
    public List<OrderDetailDTO> findAll() {
        return null;
    }

    @Override
    public OrderDetailDTO save(OrderDetailDTO orderDetailDTO) {
        OrderDetailEntity orderDetailEntity = new OrderDetailEntity();
        orderDetailEntity = (OrderDetailEntity) converter.toEntity(orderDetailDTO, OrderDetailEntity.class);
        orderDetailRepository.save(orderDetailEntity);
        return (OrderDetailDTO) converter.toDTO(orderDetailEntity, OrderDetailDTO.class);
    }

    public void createOrderDetailDTO(Long orderId, Long productID, Boolean check) {
        OrderDetailEntity orderDetailEntity = new OrderDetailEntity();

        OrderDetailDTO orderDetailDTO = new OrderDetailDTO();
        orderDetailDTO.setOrderId(orderId);
        if (check == true) {
            orderDetailDTO.setParrotId(productID);
        } else {
            orderDetailDTO.setNestId(productID);

        }

        save(orderDetailDTO);
    }


    @Override
    public void changeStatus(Long ids) {

    }
}
