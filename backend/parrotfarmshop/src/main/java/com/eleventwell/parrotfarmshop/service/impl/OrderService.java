package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.Model.CartModel;
import com.eleventwell.parrotfarmshop.converter.GenericConverter;
import com.eleventwell.parrotfarmshop.dto.OrderDTO;
import com.eleventwell.parrotfarmshop.dto.PromotionDTO;
import com.eleventwell.parrotfarmshop.entity.OrderDetailEntity;
import com.eleventwell.parrotfarmshop.entity.OrderEntity;
import com.eleventwell.parrotfarmshop.entity.NestEntity;
import com.eleventwell.parrotfarmshop.entity.ParrotEntity;
import com.eleventwell.parrotfarmshop.repository.*;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OrderService implements IGenericService<OrderDTO> {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    NestUsageHistoryRepository nestUsageHistoryRepository;

    @Autowired
    OrderDetailRepository orderDetailRepository;

    @Autowired
    ParrotRepository parrotRepository;

    @Autowired
    NestRepository parrotEggNestRepository;

    @Autowired
    PromotionService promotionService;

    @Autowired
    ParrotService parrotService;

    @Autowired
    NestService nestService;

    @Autowired
    NestUsageHistoryService nestUsageHistoryService;


    @Autowired
    GenericConverter genericConverter;

    @Autowired
    OrderDetailService orderDetailService;

    @Override
    public List<OrderDTO> findAll() {
        List<OrderDTO> result = new ArrayList<>();
        List<OrderEntity> orderEntities = orderRepository.findAll();

        for (OrderEntity entity : orderEntities) {
            OrderDTO orderDTO = (OrderDTO) genericConverter.toDTO(entity, OrderDTO.class);
            result.add(orderDTO);
        }

        return result;
    }

    public OrderDTO findOneByOrderId(Long orderId) {
        OrderEntity orderEntity = orderRepository.findOneById(orderId);
        OrderDTO orderDTO = (OrderDTO) genericConverter.toDTO(orderEntity, OrderDTO.class);

        return orderDTO;
    }

    @Override
    public OrderDTO save(OrderDTO DTO) {
        OrderEntity orderEntity = new OrderEntity();
        orderEntity = (OrderEntity) genericConverter.toEntity(DTO, OrderEntity.class);


        if(promotionService.findOneByIdForOrder(DTO.getPromotionID()) !=null){
return  null;
        }

        orderRepository.save(orderEntity);

        return (OrderDTO) genericConverter.toDTO(orderEntity, OrderDTO.class);

    }

    public OrderDTO createOrderDetail(OrderDTO dto, Long speciesId, String check) {
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
//        if (check.equals("nest")) {
//            List<NestEntity> nests = parrotEggNestRepository.findTopNByStatusIsTrue(speciesId, pageable);
//
//            for (NestEntity id : nests) {
//                orderDetailService.createOrderDetailDTO(orderDTO.getId(), id.getId(), 2);
//
//                nestService.changeSaleStatus(id.getId());
//                totalPrice += id.getSpeciesEggPrice().getPrice();
//
//
//            }
//        }
        orderDTO.setTotalPrice(totalPrice);
        save(orderDTO);
        return orderDTO;

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


                orderDetailService.createOrderDetailDTO(orderId, speciesId, 2);
                totalPrice += nestUsageHistoryRepository.findOneById(speciesId).getNest().getNestPrice().getPrice(); ;


            }

        return totalPrice;

    }
//Duyet list cartModel, moi vao lap truyen vao quantity de lay dung so luong, tinh totalprice va goi ham  createOrderDetailByCartModel de tao orderdetail
    public OrderDTO createOrderDetailsByCart(OrderDTO dto, List<CartModel> cartModels) {
        OrderDTO orderDTO = save(dto);
        Double totalPrice = 0.0;
        Pageable pageable;


        for (CartModel carts : cartModels) {
            pageable = (Pageable) PageRequest.of(0, carts.getQuantity()); // Create a PageRequest with desired page size

            totalPrice += createOrderDetailByCartModel(orderDTO.getId(), carts.getSpeicesId(), carts.getType(), pageable);


        }
        try{
           PromotionDTO promotionDTO = promotionService.findOneById(dto.getPromotionID());
            totalPrice = totalPrice- totalPrice*promotionDTO.getValue();
        }catch (Exception e){
        }

        orderDTO.setTotalPrice(totalPrice);
        save(orderDTO);
return orderDTO;
    }


    public List<OrderDTO> findAllByUserIdAndSearchSort(Long id,Date date, String status, String sortPrice, String sortDate,Pageable pageable) {
        List<OrderDTO> result = new ArrayList<>();
        List<OrderEntity> orderEntities = orderRepository.findAllByUserIdOrderByIdDescANDSearchSort(id,date,status,sortPrice,sortDate,pageable);

        for (OrderEntity entity : orderEntities) {
            OrderDTO orderDTO = (OrderDTO) genericConverter.toDTO(entity, OrderDTO.class);
            result.add(orderDTO);
        }

        return result;
    }


    @Override
    public void changeStatus(Long ids) {
        OrderEntity orderEntity = orderRepository.findOneById(ids);
        if(orderEntity.getPromotion()!=null){
            promotionService.calculateQuantity(orderEntity.getPromotion().getId(),true);
        }
        orderEntity.setStatus("Paid");
        orderRepository.save(orderEntity);

    }
    @Override
    public List<OrderDTO> findAll(Pageable pageable){
        // TODO Auto-generated method stub
        List<OrderDTO> results = new ArrayList();
        List<OrderEntity> entities = orderRepository.findAllByOrderByIdDesc(pageable);

        for(OrderEntity item : entities) {
            OrderDTO newDTO = (OrderDTO) genericConverter.toDTO(item,OrderDTO.class);
            results.add(newDTO);

        }

        return results;
    }

    public List<OrderDTO> searchByEmailOrPhone(String email, String phone, Date dateSearch,String status,String sortPrice,String sortDate, Pageable pageable){


        List<OrderDTO> results = new ArrayList();
        List<OrderEntity> entities = orderRepository.searchByEmailOrPhone(email,phone,dateSearch,status,sortPrice,sortDate,pageable);

        for(OrderEntity item : entities) {
            OrderDTO newDTO = (OrderDTO) genericConverter.toDTO(item,OrderDTO.class);
            results.add(newDTO);

        }

        return results;
    }

    public void removeOrder(Long id){

            List<OrderDetailEntity> orderDetails = orderDetailRepository.findAllByOrderIdId(id);
            OrderEntity orderEntity = orderRepository.findOneById(id);
                for (OrderDetailEntity orderDetail: orderDetails ) {
if(checkParrotOrNest(orderDetail)){
    parrotService.changeSaleStatus(getParrotId(orderDetail));
    orderDetailRepository.deleteById(orderDetail.getId());
}else{
    nestUsageHistoryService.deleteByOrderDetailid(getNestUsageHistoryId(orderDetail));
}

                }
if(orderEntity.getPromotion()!=null){
    promotionService.calculateQuantity(orderEntity.getPromotion().getId(),false);
}
            orderRepository.deleteById(id);


    }
    private Long getParrotId(OrderDetailEntity orderDetailEntity){
        return orderDetailEntity.getParrot().getId();
    }
private boolean checkParrotOrNest(OrderDetailEntity orderDetailEntity){

     return orderDetailEntity.getParrot()!=null?true:false;
}
private Long getNestUsageHistoryId(OrderDetailEntity orderDetail){
        return orderDetail.getNestUsageHistory().getId();
}
    public void removeOrderLoop(){

    }
    @Override
    public int totalItem() {
        return (int)orderRepository.count();
    }

    public int totalItemWithStatusDone() {
        return (int)orderRepository.countByStatusEquals("Done");
    }

    public int countOrdersCreatedToday() {
        Date today = new Date(); // Lấy ngày hôm nay
        return (int)orderRepository.countByCreatedDate(today);
    }

    public int countRecordsCreatedInCurrentMonth() {
        Date today = new Date(); // Lấy ngày hiện tại
        return (int)orderRepository.countByCreatedDateInCurrentMonth(today);
    }

    public int countRecordsCreatedInCurrentYear() {
        Date today = new Date(); // Lấy ngày hiện tại
        return (int)orderRepository.countByCreatedDateInCurrentYear(today);
    }

    public Double calculateTotalPriceForDoneOrdersToday() {
        Date today = new Date(); // Lấy ngày hiện tại
        return (Double) orderRepository.sumTotalPriceForDoneOrdersToday(today);
    }

    public Double calculateTotalPriceForDoneOrdersInCurrentMonth() {
        return (Double) orderRepository.sumTotalPriceForDoneOrdersInCurrentMonth();
    }

    public Double calculateTotalPriceForDoneOrdersInCurrentYear() {
        return (Double)orderRepository.sumTotalPriceForDoneOrdersInCurrentYear();
    }

    public Double calculateTotalPriceForDoneOrdersInJanuary() {
        return orderRepository.sumTotalPriceForDoneOrdersInJanuary();
    }

    public Double calculateTotalPriceForDoneOrdersInFebruary() {
        return orderRepository.sumTotalPriceForDoneOrdersInFebruary();
    }

    public Double calculateTotalPriceForDoneOrdersInMarch() {
        return orderRepository.sumTotalPriceForDoneOrdersInMarch();
    }

    public Double calculateTotalPriceForDoneOrdersInApril() {
        return orderRepository.sumTotalPriceForDoneOrdersInApril();
    }

    public Double calculateTotalPriceForDoneOrdersInMay() {
        return orderRepository.sumTotalPriceForDoneOrdersInMay();
    }

    public Double calculateTotalPriceForDoneOrdersInJune() {
        return orderRepository.sumTotalPriceForDoneOrdersInJune();
    }

    public Double calculateTotalPriceForDoneOrdersInJuly() {
        return orderRepository.sumTotalPriceForDoneOrdersInJuly();
    }

    public Double calculateTotalPriceForDoneOrdersInAugust() {
        return orderRepository.sumTotalPriceForDoneOrdersInAugust();
    }

    public Double calculateTotalPriceForDoneOrdersInSeptember() {
        return orderRepository.sumTotalPriceForDoneOrdersInSeptember();
    }

    public Double calculateTotalPriceForDoneOrdersInOctober() {
        return orderRepository.sumTotalPriceForDoneOrdersInOctober();
    }

    public Double calculateTotalPriceForDoneOrdersInNovember() {
        return orderRepository.sumTotalPriceForDoneOrdersInNovember();
    }

    public Double calculateTotalPriceForDoneOrdersInDecember() {
        return orderRepository.sumTotalPriceForDoneOrdersInDecember();
    }

    public OrderDTO findOneByUsageHistoryId(Long id) {
        OrderEntity entity = orderRepository.findOneByUsageHistory(id);
        OrderDTO orderDTO = (OrderDTO) genericConverter.toDTO(entity,OrderDTO.class);
        return orderDTO;
    }
}
