package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.converter.GenericConverter;
import com.eleventwell.parrotfarmshop.dto.OrderDetailDTO;
import com.eleventwell.parrotfarmshop.entity.OrderDetailEntity;
import com.eleventwell.parrotfarmshop.repository.OrderDetailRepository;
import com.eleventwell.parrotfarmshop.repository.OrderRepository;
import com.eleventwell.parrotfarmshop.repository.ParrotEggNestRepository;
import com.eleventwell.parrotfarmshop.repository.ParrotRepository;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class OrderDetailService implements IGenericService<OrderDetailDTO> {

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private GenericConverter converter;

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


        orderDetailEntity.setParrotEggNest(parrotEggNestRepository.findOneById(orderDetailDTO.getNestId()));
        orderDetailRepository.save(orderDetailEntity);
        return (OrderDetailDTO) converter.toDTO(orderDetailEntity, OrderDetailDTO.class);
    }

    public void createOrderDetailDTO(Long orderId, Long productID, int check) {
        OrderDetailEntity orderDetailEntity = new OrderDetailEntity();

        OrderDetailDTO orderDetailDTO = new OrderDetailDTO();
        orderDetailDTO.setOrderId(orderId);
        if (check == 1) {
            orderDetailDTO.setParrotId(productID);
        } else if (check == 2) {
            orderDetailDTO.setNestId(productID);
        }

        save(orderDetailDTO);
    }


    @Override
    public void changeStatus(Long ids) {

    }
}
