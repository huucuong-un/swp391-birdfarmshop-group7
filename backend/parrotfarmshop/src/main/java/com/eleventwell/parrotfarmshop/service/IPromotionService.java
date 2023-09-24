package com.eleventwell.parrotfarmshop.service;

import com.eleventwell.parrotfarmshop.dto.PostDTO;
import com.eleventwell.parrotfarmshop.dto.PromotionDTO;

import java.util.List;

public interface IPromotionService {

    List<PromotionDTO> findAll();
    PromotionDTO save(PromotionDTO promotionDTO);
    void delete(long[] ids);
}
