package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.Model.PagingModel;
import com.eleventwell.parrotfarmshop.dto.NestDTO;
import com.eleventwell.parrotfarmshop.dto.NestPriceDTO;
import com.eleventwell.parrotfarmshop.dto.PostDTO;
import com.eleventwell.parrotfarmshop.service.impl.FAQsService;
import com.eleventwell.parrotfarmshop.service.impl.NestPriceService;
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
@RequestMapping(value = "/api/nest-price")
public class NestPriceController {
    @Autowired
    private NestPriceService nestPriceService;

    @GetMapping
    public List<NestPriceDTO> showSpeciesEggPrie() {
        List<NestPriceDTO> results = new ArrayList<>();

        results = (nestPriceService.findAll());
        return results;
    }

    @GetMapping(value = "find-by-species-id")
    public NestPriceDTO findBySpeciesId(@RequestBody @RequestParam(value = "speciesId") Long speciesId) {

        return nestPriceService.findOneBySpeciesId(speciesId);
    }

    @GetMapping(value = "find-one-by-id")
    public NestPriceDTO findOneById(@RequestBody @RequestParam(value = "id") Long id) {
        return nestPriceService.findOneNestPriceById(id);
    }
//    @GetMapping(value = "find-by-species-id/{speciesId}")
//    public List<NestPriceDTO> findBySpeciesId(@RequestBody @PathVariable("speciesId") Long id) {
//        List<SpeciesEggPriceDTO> results = new ArrayList<>();
//
//        results = (nestPriceService.findAllBySpeciesId(id));
//        return results;
//    }


    @PostMapping
    public NestPriceDTO createRole(@RequestBody NestPriceDTO model) {
        return nestPriceService.save(model);
    }

    //accept editing description and status only
//    @PutMapping(value = "{id}")
//    public NestPriceDTO updateRole(@RequestBody NestPriceDTO model, @PathVariable("id") long id) {
//        model.setId(id);
//        return nestPriceService.save(model);
//    }

    @DeleteMapping(value = "{id}")
    public void changeStatus(@RequestBody @PathVariable("id") long id) {
        nestPriceService.changeStatus(id);
    }

    @GetMapping(value = "admin/search_sort")
    public PagingModel searchSortforNestPrice(@RequestBody @RequestParam(value = "page", required = false) Integer page,
                                       @RequestParam(value = "limit", required = false) Integer limit,
                                       @RequestParam(value = "searchDate", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date searchDate,
                                       @RequestParam(value = "status", required = false) Boolean status,
                                       @RequestParam(value = "sortPrice", required = false) String sortPrice
    ) {
        PagingModel result = new PagingModel<>();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);
        result.setListResult(((NestPriceService) nestPriceService).searchSortForNestPrice(searchDate, status, sortPrice, pageable));
        result.setTotalPage(((int) Math.ceil((double) (nestPriceService.totalItem()) / limit)));

        return result;
    }

    @PutMapping(value="{id}")
    public NestPriceDTO updateNestPrice(@RequestBody NestPriceDTO model, @PathVariable("id") long id){
        model.setId(id);
        return (NestPriceDTO) nestPriceService.save(model);
    }

}



