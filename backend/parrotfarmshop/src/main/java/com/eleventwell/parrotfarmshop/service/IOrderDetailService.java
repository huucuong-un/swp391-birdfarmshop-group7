package com.eleventwell.parrotfarmshop.service;

import com.eleventwell.parrotfarmshop.dto.OrderDetailDTO;
import com.eleventwell.parrotfarmshop.dto.ParrotEggNestDTO;

import java.util.List;

public interface IOrderDetailService {

    public OrderDetailDTO saveOrderDetail(Long orderId, Long parrotId, Long nestId);

}
