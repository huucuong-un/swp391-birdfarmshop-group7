package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.Model.OrderDetailHistoryModel;
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

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderDetailService implements IGenericService<OrderDetailDTO> {

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private GenericConverter converter;

    @Autowired
    private ParrotRepository parrotRepository;


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

    public List<OrderDetailDTO> findAllByOrderId(Long id) {

        List<OrderDetailDTO> result = new ArrayList<>();
        List<OrderDetailEntity> orderDetailEntities = orderDetailRepository.findAllByOrderIdId(id);

        for (OrderDetailEntity entity : orderDetailEntities) {
            OrderDetailDTO orderDetailDTO = (OrderDetailDTO) converter.toDTO(entity, OrderDetailDTO.class);
            result.add(orderDetailDTO);
        }

        return result;

    }



    public List<OrderDetailHistoryModel> createOrderDetailHistoryModelList(Long id) {
        List<OrderDetailEntity> listEntity = orderDetailRepository.findAllByOrderIdId(id);
        List<OrderDetailHistoryModel> listModel = new ArrayList<>();
        int count =0;
        for (OrderDetailEntity entity : listEntity) {


                for (OrderDetailHistoryModel models : listModel) {
                    if (models.getColor().equals(entity.getParrot().getParrotSpeciesColor().getColor()) && models.getSpeciesName().equals(entity.getParrot().getParrotSpeciesColor().getParrotSpecies().getName())) {
                        models.setQuantity(models.getQuantity() + 1);
                        models.setTotalPrice(
                                models.getTotalPrice()+entity.getParrot().getParrotSpeciesColor().getPrice());
                   count=1;
                     break;
                    }



            }
if(count ==0) {
    OrderDetailHistoryModel model = new OrderDetailHistoryModel();
    model.setImg(entity.getParrot().getParrotSpeciesColor().getImageUrl());
    model.setColor(entity.getParrot().getParrotSpeciesColor().getColor());
    model.setSpeciesName(entity.getParrot().getParrotSpeciesColor().getParrotSpecies().getName());
    model.setTotalPrice(entity.getParrot().getParrotSpeciesColor().getPrice());
    model.setQuantity(1);
    listModel.add(model);
}
count=0;




        }
        return listModel;
    }

    @Override
    public void changeStatus(Long ids) {
    }
}
