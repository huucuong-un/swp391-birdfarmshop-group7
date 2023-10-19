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
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private OrderDetailService orderDetailService;
    @Autowired
    private UserService userService;

    @GetMapping(value = "admin/order_management/list")
    public PagingModel findAllOrder(@RequestBody @RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "limit", required = false) Integer limit) {
        PagingModel result = new PagingModel();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);

        result.setListResult(orderService.findAll(pageable));
        result.setTotalPage(((int) Math.ceil((double) (result.getListResult().size()) / limit)));
        result.setLimit(limit);
        return result;
    }
    @GetMapping(value = "admin/order_management/search")
    public PagingModel searchOrderByPhoneAnd(@RequestBody @RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "limit", required = false) Integer limit,@RequestParam(value = "email", required = false) String email,@RequestParam(value = "phone", required = false) String phone, @RequestParam(value = "date", required = false)  @DateTimeFormat(pattern = "yyyy-MM-dd") Date date,@RequestParam(value = "status",required = false) String status,@RequestParam(value = "sortPrice", required = false) String sortPrice,@RequestParam(value = "sortDate", required = false) String sortDate) {
        PagingModel result = new PagingModel();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);

        result.setListResult(orderService.searchByEmailOrPhone(email,phone,date,status,sortPrice,sortDate,pageable));
        result.setTotalPage(((int) Math.ceil((double) (result.getListResult().size()) / limit)));
        result.setLimit(limit);
        return result;
    }

    @GetMapping(value = "findAllByUserId/{id}")
    public List<OrderResponse> findAllByOrderId(@RequestBody @PathVariable Long id) {
        List<OrderDTO> orders = orderService.findAllByUserId(id);
        List<OrderResponse> orderResponses = new ArrayList<>();

        List<OrderDetailHistoryModel> orderDetailHistoryModes = new ArrayList<>();

        for (OrderDTO dto : orders) {
            OrderResponse orderResponse = new OrderResponse();
            orderDetailHistoryModes = orderDetailService.createOrderDetailHistoryModelList(dto.getId());
            orderResponse.setOrderDTO(dto);
            orderResponse.setListOrderDetailHistoryModel(orderDetailHistoryModes);

            orderResponses.add(orderResponse);
        }


        return orderResponses;

    }

    @PostMapping(value = "find-all-order-with-user")
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

    @GetMapping(value = "find-all-model-order-detail-by-id/{id}")
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
    public void createOrder(@RequestBody OrderDTO dto, @PathVariable Long species, @PathVariable String product) {

        orderService.createOrderDetail(dto, species, product);
    }

    @PostMapping(value = "cart")
    public void createOrderByCart(@RequestBody OrderRequest orderRequest) {
        OrderDTO dto = orderRequest.getOrderDTO();
        List<CartModel> listcart = orderRequest.getCartList();
        orderService.createOrderDetailsByCart(dto, listcart);
    }

    @DeleteMapping(value = "{id}")
    public void deleteParrot(@RequestBody @PathVariable("id") Long id) {
        orderService.changeStatus(id);
    }


}

