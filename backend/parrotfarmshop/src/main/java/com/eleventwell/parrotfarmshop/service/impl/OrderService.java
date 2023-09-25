package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.converter.Converter;
import com.eleventwell.parrotfarmshop.dto.OrderDTO;
import com.eleventwell.parrotfarmshop.dto.ParrotDTO;
import com.eleventwell.parrotfarmshop.dto.ParrotEggNestDTO;
import com.eleventwell.parrotfarmshop.entity.OrderEntity;
import com.eleventwell.parrotfarmshop.entity.ParrotEggNestEntity;
import com.eleventwell.parrotfarmshop.repository.OrderRepository;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService implements IGenericService<OrderDTO> {

    @Autowired
    OrderRepository orderRepository;
    @Autowired
    Converter converter;

    @Override
    public List<OrderDTO> findAll() {
        List<OrderDTO> result = new ArrayList<>();
        List<OrderEntity> orderEntities = orderRepository.findAll();

        for (OrderEntity entity : orderEntities) {
            OrderDTO orderDTO = (OrderDTO) converter.toDTO(entity, OrderDTO.class);
            result.add(orderDTO);
        }

        return result;
    }

    @Override
    public OrderDTO save(OrderDTO DTO) {
    OrderEntity orderEntity = new OrderEntity();
     orderEntity = (OrderEntity) converter.toEntity(DTO, OrderEntity.class);

     orderRepository.save(orderEntity);

     return (OrderDTO) converter.toDTO(orderEntity, OrderDTO.class);

    }
    public void createOrderDetail(OrderDTO DTO, List<Integer> parrotIds,List<Integer> nestIds) {

        save(DTO);

        if(!parrotIds.isEmpty()){

            for (Integer parrotID : parrotIds) {

            }
        }


    }


    @Override
    public void changeStatus(Long ids) {
OrderEntity orderEntity = orderRepository.findOneById(ids);
if(orderEntity.getStatus() == true){
    orderEntity.setStatus(false);
}else{
    orderEntity.setStatus(true);
}
orderRepository.save(orderEntity);


    }
}
