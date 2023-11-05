package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.Model.CartModel;
import com.eleventwell.parrotfarmshop.Model.OrderDetailHistoryModel;
import com.eleventwell.parrotfarmshop.Model.PagingModel;
import com.eleventwell.parrotfarmshop.Request.OrderRequest;
import com.eleventwell.parrotfarmshop.Response.OrderResponse;
import com.eleventwell.parrotfarmshop.Response.OrderResponseForManagement;
import com.eleventwell.parrotfarmshop.dto.OrderDTO;
import com.eleventwell.parrotfarmshop.dto.UserDTO;
import com.eleventwell.parrotfarmshop.service.impl.OrderDetailService;
import com.eleventwell.parrotfarmshop.service.impl.OrderService;
import com.eleventwell.parrotfarmshop.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api")
public class OrderController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private OrderDetailService orderDetailService;
    @Autowired
    private UserService userService;

    @GetMapping(value = "admin/order/order_management/list")
    public PagingModel findAllOrder(@RequestBody @RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "limit", required = false) Integer limit) {
        PagingModel result = new PagingModel();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);

        List<OrderDTO> orders = orderService.findAll(pageable);
        List<OrderResponseForManagement> orderResponses = new ArrayList<>();

        List<OrderDetailHistoryModel> orderDetailHistoryModel = new ArrayList<>();

        for (OrderDTO dto : orders) {
            OrderResponseForManagement orderResponse = new OrderResponseForManagement();
            orderDetailHistoryModel = orderDetailService.createOrderDetailHistoryModelList(dto.getId());
            orderResponse.setOrderDTO(dto);
            orderResponse.setListOrderDetailHistoryModel(orderDetailHistoryModel);
            UserDTO user = userService.findOneById(dto.getUserID());
            orderResponse.setUserDTO(user);


            orderResponses.add(orderResponse);
        }

        result.setListResult(orderResponses);
        result.setTotalPage(((int) Math.ceil((double) (orderService.totalItem()) / limit)));
        result.setLimit(limit);
      return  result;

    }
    @GetMapping(value = "staff/order/order_management/search")
    public PagingModel searchOrderByPhoneAnd(@RequestBody @RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "limit", required = false) Integer limit,@RequestParam(value = "email", required = false) String email,@RequestParam(value = "phone", required = false) String phone, @RequestParam(value = "date", required = false)  @DateTimeFormat(pattern = "yyyy-MM-dd") Date date,@RequestParam(value = "status",required = false) String status,@RequestParam(value = "sortPrice", required = false) String sortPrice,@RequestParam(value = "sortDate", required = false) String sortDate) {
        PagingModel result = new PagingModel();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);

        List<OrderDTO> orders = orderService.searchByEmailOrPhone(email,phone,date,status,sortPrice,sortDate,pageable);
        List<OrderResponseForManagement> orderResponses = new ArrayList<>();

        List<OrderDetailHistoryModel> orderDetailHistoryModel = new ArrayList<>();

        for (OrderDTO dto : orders) {
            OrderResponseForManagement orderResponse = new OrderResponseForManagement();
            orderDetailHistoryModel = orderDetailService.createOrderDetailHistoryModelList(dto.getId());
            orderResponse.setOrderDTO(dto);
            orderResponse.setListOrderDetailHistoryModel(orderDetailHistoryModel);
            UserDTO user = userService.findOneById(dto.getUserID());
            orderResponse.setUserDTO(user);


            orderResponses.add(orderResponse);
        }

        result.setListResult(orderResponses);
        result.setTotalPage(((int) Math.ceil((double) (orderService.totalItem()) / limit)));
        result.setLimit(limit);
        return result;
    }

    @GetMapping(value = "customer/order/order-history-search-sort")
    public PagingModel findAllByOrderId(@RequestBody @RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "limit", required = false) Integer limit,@RequestParam(value = "userId", required = false) Long userId  ,@RequestParam(value = "date", required = false)  @DateTimeFormat(pattern = "yyyy-MM-dd") Date date,@RequestParam(value = "status",required = false) String status,@RequestParam(value = "sortPrice", required = false) String sortPrice,@RequestParam(value = "sortDate", required = false) String sortDate) {

        PagingModel result = new PagingModel();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);


        List<OrderDTO> orders = orderService.findAllByUserIdAndSearchSort(userId,date,status,sortPrice,sortDate,pageable);
        List<OrderResponse> orderResponses = new ArrayList<>();

        List<OrderDetailHistoryModel> orderDetailHistoryModes = new ArrayList<>();

        for (OrderDTO dto : orders) {
            OrderResponse orderResponse = new OrderResponse();
            orderDetailHistoryModes = orderDetailService.createOrderDetailHistoryModelList(dto.getId());
            orderResponse.setOrderDTO(dto);
            orderResponse.setListOrderDetailHistoryModel(orderDetailHistoryModes);

            orderResponses.add(orderResponse);
        }


        result.setListResult(orderResponses);
        result.setTotalPage(((int) Math.ceil((double) (orderService.totalItem()) / limit)));
        result.setLimit(limit);

        return result;

    }

    @PostMapping(value = "order/find-all-order-with-user")
    public List<OrderResponseForManagement> findAllOrderWithUserInfo() {
        List<OrderDTO> orders = orderService.findAll();
        List<OrderResponseForManagement> orderResponses = new ArrayList<>();

        List<OrderDetailHistoryModel> orderDetailHistoryModel = new ArrayList<>();

        for (OrderDTO dto : orders) {
            OrderResponseForManagement orderResponse = new OrderResponseForManagement();
            orderDetailHistoryModel = orderDetailService.createOrderDetailHistoryModelList(dto.getId());
            orderResponse.setOrderDTO(dto);
            orderResponse.setListOrderDetailHistoryModel(orderDetailHistoryModel);
            UserDTO user = userService.findOneById(dto.getUserID());
            orderResponse.setUserDTO(user);


            orderResponses.add(orderResponse);
        }


        return orderResponses;

    }

    @GetMapping(value = "order/find-all-model-order-detail-by-id/{id}")
    public List<OrderDetailHistoryModel> findAllModelByOrderId(@RequestBody @PathVariable Long id) {

        return orderDetailService.createOrderDetailHistoryModelList(id);

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
    public OrderDTO createOrder(@RequestBody OrderDTO dto, @PathVariable Long species, @PathVariable String product) {

      return  orderService.createOrderDetail(dto, species, product);
    }

    @PostMapping(value = "customer/order/cart")
    public OrderDTO createOrderByCart(@RequestBody OrderRequest orderRequest) {
        OrderDTO dto = orderRequest.getOrderDTO();
        List<CartModel> listcart = orderRequest.getCartList();
      return  orderService.createOrderDetailsByCart(dto, listcart);
    }

    @DeleteMapping(value = "customer/{id}")
    public void deleteParrot(@RequestBody @PathVariable("id") Long id) {
        orderService.changeStatus(id);
    }

    @GetMapping(value = "total-item")
    public Integer totalItems() {
        return orderService.totalItemWithStatusDone();
    }

    @GetMapping(value = "total-item-in-current-day")
    public Integer totalItemsInCurrentDay() {
        return orderService.countOrdersCreatedToday();
    }

    @GetMapping(value = "total-item-in-current-month")
    public Integer totalItemsInCurrentMonth() {
        return orderService.countRecordsCreatedInCurrentMonth();
    }

    @GetMapping(value = "total-item-in-current-year")
    public Integer totalItemsInCurrentYear() {
        return orderService.countRecordsCreatedInCurrentYear();
    }

    @GetMapping(value = "total-price-in-current-day")
    public Double totalPriceInCurrentDay() {
        return orderService.calculateTotalPriceForDoneOrdersToday();
    }

    @GetMapping(value = "total-price-in-current-month")
    public Double totalPriceInCurrentMonth() {
        return orderService.calculateTotalPriceForDoneOrdersInCurrentMonth();
    }

    @GetMapping(value = "total-price-in-current-year")
    public Double totalPriceInCurrentYear() {
        return orderService.calculateTotalPriceForDoneOrdersInCurrentYear();
    }

    @GetMapping(value = "total-price-in-january")
    public Double totalPriceInJanuary() {
        return orderService.calculateTotalPriceForDoneOrdersInJanuary();
    }

    @GetMapping(value = "total-price-in-February")
    public Double totalPriceInFebruary() {
        return orderService.calculateTotalPriceForDoneOrdersInFebruary();
    }

    @GetMapping(value = "total-price-in-March")
    public Double totalPriceInMarch() {
        return orderService.calculateTotalPriceForDoneOrdersInMarch();
    }

    @GetMapping(value = "total-price-in-April")
    public Double totalPriceInApril() {
        return orderService.calculateTotalPriceForDoneOrdersInApril();
    }

    @GetMapping(value = "total-price-in-May")
    public Double totalPriceInMay() {
        return orderService.calculateTotalPriceForDoneOrdersInMay();
    }

    @GetMapping(value = "total-price-in-June")
    public Double totalPriceInJune() {
        return orderService.calculateTotalPriceForDoneOrdersInJune();
    }

    @GetMapping(value = "total-price-in-July")
    public Double totalPriceInJuly() {
        return orderService.calculateTotalPriceForDoneOrdersInJuly();
    }

    @GetMapping(value = "total-price-in-August")
    public Double totalPriceInAugust() {
        return orderService.calculateTotalPriceForDoneOrdersInAugust();
    }

    @GetMapping(value = "total-price-in-September")
    public Double totalPriceInSeptember() {
        return orderService.calculateTotalPriceForDoneOrdersInSeptember();
    }

    @GetMapping(value = "total-price-in-October")
    public Double totalPriceInOctober() {
        return orderService.calculateTotalPriceForDoneOrdersInOctober();
    }

    @GetMapping(value = "total-price-in-November")
    public Double totalPriceInNovember() {
        return orderService.calculateTotalPriceForDoneOrdersInNovember();
    }

    @GetMapping(value = "total-price-in-December")
    public Double totalPriceInDecember() {
        return orderService.calculateTotalPriceForDoneOrdersInDecember();
    }

    @GetMapping(value = "staff/order/find-one-by-usage-history-id/{id}")
    public OrderDTO findOneByUsageHistory(@RequestBody @PathVariable Long id) {
        return orderService.findOneByUsageHistoryId(id);
    }


}

