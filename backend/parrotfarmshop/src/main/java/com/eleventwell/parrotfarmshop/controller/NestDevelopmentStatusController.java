package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.Model.PagingModel;
import com.eleventwell.parrotfarmshop.dto.NestDevelopmentDTO;
import com.eleventwell.parrotfarmshop.dto.NestDevelopmentStatusDTO;
import com.eleventwell.parrotfarmshop.dto.ParrotSpeciesDTO;
import com.eleventwell.parrotfarmshop.service.impl.NestDevelopmentService;
import com.eleventwell.parrotfarmshop.service.impl.NestDevelopmentStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api")
public class NestDevelopmentStatusController {
    @Autowired
    NestDevelopmentStatusService nestDevelopmentStatusService;

    @GetMapping(value = "customer/nest-development-status")
    public PagingModel findAll(@RequestBody @RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "limit", required = false) Integer limit) {
        PagingModel result = new PagingModel();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);

        List<NestDevelopmentStatusDTO> nestDevelopmentStatusDTO = nestDevelopmentStatusService.findAll(pageable);
        result.setListResult(nestDevelopmentStatusDTO);
        result.setTotalPage(((int) Math.ceil((double) (nestDevelopmentStatusService.totalItem()) / limit)));
        result.setLimit(limit);
        return result;

    }

    @GetMapping(value = "customer/nest-development-status/find-one-status-by-id/{id}")
    public NestDevelopmentStatusDTO findOneStatusById(@RequestBody @PathVariable("id") long id) {
        NestDevelopmentStatusDTO nestDevelopmentStatusDTO = nestDevelopmentStatusService.findOneById(id);
        return nestDevelopmentStatusDTO;
    }

    @GetMapping(value = "admin/nest-development-status/find-one-by-sequence/{id}")
    public NestDevelopmentStatusDTO findOneBySequence(@RequestBody @PathVariable("id") Integer id) {
        NestDevelopmentStatusDTO nestDevelopmentStatusDTO = nestDevelopmentStatusService.findOneBySequence(id);
        return nestDevelopmentStatusDTO;
    }

    /*@PutMapping(value = "/admin/update-status")
    public void updateStatus(@RequestBody @RequestParam(value = "id") Long id) {
        nestDevelopmentStatusService.changeStatus(id);
    }*/

    @PostMapping(value = "admin/nest-development-status")
    public NestDevelopmentStatusDTO createNestDevelopment(@RequestBody NestDevelopmentStatusDTO model) {
        return (NestDevelopmentStatusDTO) nestDevelopmentStatusService.save(model);
    }

    @PutMapping(value = "admin/nest-development-status/update-sequence")
    public void updateSequence(@RequestBody @RequestParam(value = "id") Long id, @RequestParam(value = "sequence") Integer sequence) {
        nestDevelopmentStatusService.changeSequence(id, sequence);
    }

    @DeleteMapping(value = "admin/nest-development-status/{id}")
    public void changeStatus(@RequestBody @PathVariable("id") long id){
        nestDevelopmentStatusService.changeStatus(id);
    }
}
