package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.Model.PagingModel;
import com.eleventwell.parrotfarmshop.dto.PromotionDTO;
import com.eleventwell.parrotfarmshop.service.impl.FAQsService;
import com.eleventwell.parrotfarmshop.service.impl.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api")
public class PromotionController {

    @Autowired
    PromotionService promotionService;

    @GetMapping(value = "/promotion")
    public List<PromotionDTO> show() {

        List<PromotionDTO> list = promotionService.findAll();
        return list;

    }
    @GetMapping(value = "/admin/promotion")
    public List<PromotionDTO> showForAdmin() {

        List<PromotionDTO> list = promotionService.findAll();
        return list;

    }

    @GetMapping(value = "/promotion/find-one-by-code")
    public PromotionDTO findOneByCode(@RequestBody @RequestParam("code") String code) {

        return promotionService.findOneByCode(code);

    }


    @PostMapping(value = "admin/promotion")
    public PromotionDTO create(@RequestBody PromotionDTO model) {
        return (PromotionDTO) promotionService.save(model);
    }

    @PutMapping(value = "admin/promotion/{id}")
    public PromotionDTO update(@RequestBody PromotionDTO model, @PathVariable("id") long id) {
        model.setId(id);
        return (PromotionDTO) promotionService.save(model);
    }

    //    @DeleteMapping(value = "")
//    public void delete(@RequestBody long[] ids){
//        promotionService.delete(ids);
//    }
    @PutMapping(value = "admin/promotion/change-status/{id}")
    public void changeStatus(@RequestBody @PathVariable("id") Long id) {
        promotionService.changeStatus(id);
    }

    @GetMapping(value = "admin/promotion/search_sort")
    public PagingModel searchSortForPromotion(@RequestBody @RequestParam(value = "page", required = false) Integer page,
                                              @RequestParam(value = "limit", required = false) Integer limit,
                                              @RequestParam(value = "searchStartDate", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date searchStartDate,
                                              @RequestParam(value = "searchEndDate", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date searchEndDate,
                                              @RequestParam(value = "sortDate", required = false) String sortDate,
                                              @RequestParam(value = "sortPrice", required = false) String sortPrice,
                                              @RequestParam(value = "status", required = false) Boolean status) {

        PagingModel result = new PagingModel();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);


        result.setListResult(promotionService.searchSortForPromotion(searchStartDate, searchEndDate, sortDate, sortPrice, status, pageable));
        result.setTotalPage(((int) Math.ceil((double) (promotionService.totalItem()) / limit)));
        result.setLimit(limit);
        return result;
    }

    @GetMapping(value = "/marketer/promotion")
    public List<PromotionDTO> showForMarketerWithTrueStatus() {

        List<PromotionDTO> list = promotionService.findAllByStatusTrue();
        return list;

    }

    @PostMapping(value = "admin/promotion/find-one-by-code-new/{code}")
    public PromotionDTO findOneByCodeNotCheckDate(@PathVariable("code") String code){
        return promotionService.findOneByCodeNotCheckDate(code);
    }


}
