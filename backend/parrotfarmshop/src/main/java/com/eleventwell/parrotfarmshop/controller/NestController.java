package com.eleventwell.parrotfarmshop.controller;


import com.eleventwell.parrotfarmshop.Model.PagingModel;
import com.eleventwell.parrotfarmshop.dto.NestDTO;
import com.eleventwell.parrotfarmshop.dto.NestDevelopmentDTO;
import com.eleventwell.parrotfarmshop.output.ListOutput;
import com.eleventwell.parrotfarmshop.service.impl.FAQsService;
import com.eleventwell.parrotfarmshop.service.impl.NestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/parrot-egg-nest")
public class NestController {
    @Autowired
    private NestService nestService;

    @GetMapping(value = "")
    public PagingModel findAllOrder(@RequestBody @RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "limit", required = false) Integer limit) {
        PagingModel result = new PagingModel();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);

        List<NestDTO> nest = nestService.findAll(pageable);
        result.setListResult(nest);
        result.setTotalPage(((int) Math.ceil((double) (nestService.totalItem()) / limit)));
        result.setLimit(limit);
        return result;
    }

    @GetMapping(value = "find-one-by-species-id")
    public NestDTO findAllO(@RequestBody @RequestParam(value = "speciesId", required = false) Long speciesId) {

        return nestService.findOneBySpeciesId(speciesId);
    }

    @GetMapping(value = "find-one-by-id")
    public NestDTO findOneById(@RequestBody @RequestParam(value = "id") Long id) {
        return nestService.findOneById(id);
    }

    //add a parrot egg nest by Post method
    @PostMapping(value = "")
    public NestDTO createParrotEggNest(@RequestBody NestDTO model) {

        return (NestDTO) nestService.save(model);
    }


    @PutMapping(value = "{id}")
    public NestDTO updateParrotEggNest(@RequestBody NestDTO model, @PathVariable("id") Long id) {
        model.setId(id);
        return (NestDTO) nestService.save(model);
    }

    @DeleteMapping(value = "{id}")
    public void deleteParrotEggNest(@RequestBody @PathVariable("id") Long id) {
        nestService.changeStatus(id);
    }


//    @DeleteMapping(value = "change-sale-status/{id}")
//    public void changeSaleStatus(@RequestBody @PathVariable("id") Long id){
//        parrotEggNestService.changeSaleStatus(id);
//    }

    //    @DeleteMapping(value = "change-breed-status/{id}")
//    public void changeBreedStatus(@RequestBody @PathVariable("id") Long id){
//        parrotEggNestService.changeBreedStatus(id);
//    }
    @GetMapping(value = "admin/search_sort")
    public PagingModel searchSortForNest(@RequestBody @RequestParam(value = "page", required = false) Integer page,
                                         @RequestParam(value = "limit", required = false) Integer limit,
                                         @RequestParam(value = "searchDate", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date searchDate,
                                         @RequestParam(value = "status", required = false) Boolean status,
                                         @RequestParam(value = "sortNestPriceID", required = false) String sortNestPriceID
    ) {
        PagingModel result = new PagingModel();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);

        result.setListResult(nestService.searchSortForNest(searchDate, status, sortNestPriceID, pageable));
        result.setTotalPage(((int) Math.ceil((double) (nestService.totalItem()) / limit)));
        result.setLimit(limit);
        return result;
    }


}

