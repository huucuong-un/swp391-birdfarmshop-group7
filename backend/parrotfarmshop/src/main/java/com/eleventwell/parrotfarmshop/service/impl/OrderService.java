package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.Cart.CartModel;
import com.eleventwell.parrotfarmshop.converter.GenericConverter;
import com.eleventwell.parrotfarmshop.dto.OrderDTO;
import com.eleventwell.parrotfarmshop.entity.OrderEntity;
import com.eleventwell.parrotfarmshop.entity.ParrotEggNestEntity;
import com.eleventwell.parrotfarmshop.entity.ParrotEntity;
import com.eleventwell.parrotfarmshop.repository.OrderRepository;
import com.eleventwell.parrotfarmshop.repository.ParrotEggNestRepository;
import com.eleventwell.parrotfarmshop.repository.ParrotRepository;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService implements IGenericService<OrderDTO> {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    ParrotRepository parrotRepository;

    @Autowired
    ParrotEggNestRepository parrotEggNestRepository;

    @Autowired
    ParrotService parrotService;

    @Autowired
    ParrotEggNestService parrotEggNestService;

    @Autowired
    GenericConverter genericConverter;

    @Autowired
    OrderDetailService orderDetailService;

    @Override
    public List<OrderDTO> findAll() {
        List<OrderDTO> result = new ArrayList<>();
        List<OrderEntity> orderEntities = orderRepository.findAllByOrderByIdDesc();

        for (OrderEntity entity : orderEntities) {
            OrderDTO orderDTO = (OrderDTO) genericConverter.toDTO(entity, OrderDTO.class);
            result.add(orderDTO);
        }

        return result;
    }

    @Override
    public OrderDTO save(OrderDTO DTO) {
        OrderEntity orderEntity = new OrderEntity();
        orderEntity = (OrderEntity) genericConverter.toEntity(DTO, OrderEntity.class);

        orderRepository.save(orderEntity);

        return (OrderDTO) genericConverter.toDTO(orderEntity, OrderDTO.class);

    }

    public void createOrderDetail(OrderDTO dto, Long speciesId, String check) {
        OrderDTO orderDTO = save(dto);
        Double totalPrice = 0.0;
        Pageable pageable = (Pageable) PageRequest.of(0, orderDTO.getQuantity()); // Create a PageRequest with desired page size

        if (check.equals("parrot")) {
            List<ParrotEntity> parrots = parrotRepository.findTopNByStatusIsTrue(speciesId, pageable);

            for (ParrotEntity id : parrots) {
                orderDetailService.createOrderDetailDTO(orderDTO.getId(), id.getId(), 1);
                parrotService.changeSaleStatus(id.getId());
                totalPrice += id.getParrotSpeciesColor().getPrice();
            }
        }
        if (check.equals("nest")) {
            List<ParrotEggNestEntity> nests = parrotEggNestRepository.findTopNByStatusIsTrue(speciesId, pageable);

            for (ParrotEggNestEntity id : nests) {
                orderDetailService.createOrderDetailDTO(orderDTO.getId(), id.getId(), 2);

                parrotEggNestService.changeSaleStatus(id.getId());
                totalPrice += id.getSpeciesEggPrice().getPrice();


            }
        }
        orderDTO.setTotalPrice(totalPrice);
        save(orderDTO);

    }


    //Tinh totalprice va tra ve totalprice, dong thoi tao orderdetail ung voi dieu kien
    public Double createOrderDetailByCartModel(Long orderId, Long speciesId, String check, Pageable pageable) {

        Double totalPrice = 0.0;

        if (check.equals("parrot")) {
            List<ParrotEntity> parrots = parrotRepository.findTopNByStatusIsTrue(speciesId, pageable);

            for (ParrotEntity id : parrots) {
                orderDetailService.createOrderDetailDTO(orderId, id.getId(), 1);
                parrotService.changeSaleStatus(id.getId());
                totalPrice += id.getParrotSpeciesColor().getPrice();
            }
        }
        if (check.equals("nest")) {
            List<ParrotEggNestEntity> nests = parrotEggNestRepository.findTopNByStatusIsTrue(speciesId, pageable);

            for (ParrotEggNestEntity id : nests) {
                orderDetailService.createOrderDetailDTO(orderId, id.getId(), 2);

                parrotEggNestService.changeSaleStatus(id.getId());
                totalPrice += id.getSpeciesEggPrice().getPrice();


            }
        }
        return totalPrice;

    }
//Duyet list cartModel, moi vao lap truyen vao quantity de lay dung so luong, tinh totalprice va goi ham  createOrderDetailByCartModel de tao orderdetail
    public void createOrderDetailsByCart(OrderDTO dto, List<CartModel> cartModels) {
        OrderDTO orderDTO = save(dto);
        Double totalPrice = 0.0;
        Pageable pageable;


        for (CartModel carts : cartModels) {
            pageable = (Pageable) PageRequest.of(0, carts.getQuantity()); // Create a PageRequest with desired page size

            totalPrice += createOrderDetailByCartModel(orderDTO.getId(), carts.getSpeicesId(), carts.getType(), pageable);


        }


        orderDTO.setTotalPrice(totalPrice);
        save(orderDTO);

    }

    public List<OrderDTO> findAllByUserId(Long id) {
        List<OrderDTO> result = new ArrayList<>();
        List<OrderEntity> orderEntities = orderRepository.findAllByUserIdOrderByIdDesc(id);

        for (OrderEntity entity : orderEntities) {
            OrderDTO orderDTO = (OrderDTO) genericConverter.toDTO(entity, OrderDTO.class);
            result.add(orderDTO);
        }

        return result;
    }

    @Override
    public void changeStatus(Long ids) {
        OrderEntity orderEntity = orderRepository.findOneById(ids);
        if (orderEntity.getStatus() == true) {
            orderEntity.setStatus(false);
        } else {
            orderEntity.setStatus(true);
        }
        orderRepository.save(orderEntity);


    }
}
