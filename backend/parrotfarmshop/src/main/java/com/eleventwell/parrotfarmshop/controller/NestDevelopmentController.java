package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.Model.OrderDetailHistoryModel;
import com.eleventwell.parrotfarmshop.Model.PagingModel;
import com.eleventwell.parrotfarmshop.Response.OrderResponseForManagement;
import com.eleventwell.parrotfarmshop.dto.*;
import com.eleventwell.parrotfarmshop.output.ListOutput;
import com.eleventwell.parrotfarmshop.service.impl.NestDevelopmentService;
import com.eleventwell.parrotfarmshop.service.impl.SliderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api")
public class NestDevelopmentController {
    @Autowired
    NestDevelopmentService nestDevelopmentService;

    @GetMapping(value = "admin/nest-development")
    public PagingModel findAllOrder(@RequestBody @RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "limit", required = false) Integer limit) {
        PagingModel result = new PagingModel();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);

        List<NestDevelopmentDTO> nestDevelopment = nestDevelopmentService.findAll(pageable);



        result.setListResult(nestDevelopment);
        result.setTotalPage(((int) Math.ceil((double) (nestDevelopmentService.totalItem()) / limit)));
        result.setLimit(limit);
        return result;

    }

    @GetMapping(value = "customer/nest-development/find-all-by-nest-usage-history-id/{id}")
    public List<NestDevelopmentDTO> findAllByNestUsageHistoryId(@RequestBody @PathVariable("id") long id) {
        List<NestDevelopmentDTO> list = new ArrayList<>();
        list = nestDevelopmentService.findAllByNestUsageHistoryId(id);
        return list;
    }

    /*@PutMapping(value = "/admin/update-status")
    public void updateStatus(@RequestBody @RequestParam(value = "id") Long id, @RequestParam(value = "action") Boolean action) {
        nestDevelopmentService.changeStatus(id, action);
    }*/

    @PostMapping(value = "staff/nest-development")
    public NestDevelopmentDTO createNestDevelopment(@RequestBody NestDevelopmentDTO model) {
        return (NestDevelopmentDTO) nestDevelopmentService.save(model);
    }

}
