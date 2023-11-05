package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.Model.PagingModel;
import com.eleventwell.parrotfarmshop.dto.*;
import com.eleventwell.parrotfarmshop.service.impl.NestDevelopmentService;
import com.eleventwell.parrotfarmshop.service.impl.NestUsageHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api")
public class NestUsageHistoryController {
    @Autowired
    NestUsageHistoryService nestUsageHistoryService;

    @GetMapping(value = "staff/nest-usage-history")
    public PagingModel findAllOrder(@RequestBody @RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "limit", required = false) Integer limit) {
        PagingModel result = new PagingModel();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);

        List<NestUsageHistoryDTO> nestDevelopment = nestUsageHistoryService.findAll(pageable);
        result.setListResult(nestDevelopment);
        result.setTotalPage(((int) Math.ceil((double) (nestUsageHistoryService.totalItem()) / limit)));
        result.setLimit(limit);
        return result;

    }
    @GetMapping(value = "customer/nest-usage-history/find-by-parrot-id/{id}")
    public NestUsageHistoryDTO findOneByOrderId(@PathVariable("id") Long id) {
        NestUsageHistoryDTO nestUsageHistoryDTO = nestUsageHistoryService.findOneByOrderId(id);
        return  nestUsageHistoryDTO;
    }

    @PutMapping(value = "admin/update-status")
    public void updateStatus(@RequestBody @RequestParam(value = "id") Long id) {
        nestUsageHistoryService.changeStatus(id);
    }

    @PostMapping(value = "staff/nest-usage-history")
    public NestUsageHistoryDTO createNestUsageHistory(@RequestBody NestUsageHistoryDTO model) {
        return (NestUsageHistoryDTO) nestUsageHistoryService.save(model);
    }


}
