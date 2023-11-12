/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.Model.PagingModel;
import com.eleventwell.parrotfarmshop.dto.ParrotDTO;
import com.eleventwell.parrotfarmshop.dto.ParrotSpeciesDTO;
import com.eleventwell.parrotfarmshop.output.ListOutput;
import com.eleventwell.parrotfarmshop.service.IGenericService;
//import com.eleventwell.parrotfarmshop.service.IParrotSpeciesService;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.eleventwell.parrotfarmshop.service.impl.ParrotSpeciesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

/**
 * @author ASUS
 */
@CrossOrigin
@RestController
@RequestMapping(value = "/api")
public class ParrotSpeciesController {
    @Autowired
    private ParrotSpeciesService parrotSpeciesService;

//    @GetMapping(value = "")
//    public List<ParrotSpeciesDTO> showParrotSpecies() {
//        ListOutput result = new ListOutput();
//
//        result.setListResult(parrotSpeciesService.findAll());
//        return result.getListResult();
//    }

    @GetMapping(value = "parrot-species/find-one-species-by-id/{id}")
    public List<ParrotSpeciesDTO> findOneSpeciesById(@RequestBody @PathVariable("id") long id) {
        List<ParrotSpeciesDTO> list = new ArrayList<>();
        list.add((ParrotSpeciesDTO) parrotSpeciesService.findOneSpeciesById(id));
        return list;
    }

    @GetMapping(value = "parrot-species/find-one-species-by-id-object/{id}")
    public ParrotSpeciesDTO findOneSpeciesByIdInNest(@RequestBody @PathVariable("id") long id) {
        ParrotSpeciesDTO list = parrotSpeciesService.findOneSpeciesById(id);
        return list;
    }

    @GetMapping(value = "parrot-species/find-one-species-by-parrot-id/{id}")
    public List<ParrotSpeciesDTO> findOneSpeciesByParrotId(@RequestBody @PathVariable("id") long id) {
        List<ParrotSpeciesDTO> list = new ArrayList<>();
        list.add((ParrotSpeciesDTO) parrotSpeciesService.findOneSpeciesParrotById(id));
        return list;
    }
    @GetMapping(value = "parrot-species/find-one-species-by-color-id/{id}")
    public ParrotSpeciesDTO findOneSpeciesByColorId(@RequestBody @PathVariable("id") long id) {

        return (ParrotSpeciesDTO) parrotSpeciesService.findOneByColorId(id);

    }

    @GetMapping(value = "parrot-species/total-item")
    public Integer totalItems() {
        return parrotSpeciesService.totalItem();
    }

    @GetMapping(value = "parrot-species")
    public PagingModel showNew(@RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "limit", required = false) Integer limit) {
        PagingModel result = new PagingModel();
        if (page != null && limit != null) {
            result.setPage(page);
            Pageable pageable = PageRequest.of(page - 1, limit);
            result.setListResult(parrotSpeciesService.findAll(pageable));
            result.setTotalPage(((int) Math.ceil((double) (parrotSpeciesService.totalItem()) / limit)));
            result.setLimit(limit);
        } else {
            result.setListResult(parrotSpeciesService.findAll());
        }

        return result;
    }
    @GetMapping(value = "parrot-species-true")
    public PagingModel showTrue(@RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "limit", required = false) Integer limit) {
        PagingModel result = new PagingModel();
        if (page != null && limit != null) {
            result.setPage(page);
            Pageable pageable = PageRequest.of(page - 1, limit);
            result.setListResult(parrotSpeciesService.findAllByStatusIsTrue(pageable));
            result.setTotalPage(((int) Math.ceil((double) (parrotSpeciesService.totalItem()) / limit)));
            result.setLimit(limit);
        } else {
            result.setListResult(parrotSpeciesService.findAll());
        }

        return result;
    }

    @GetMapping(value = "parrot-species/list")
    public PagingModel showNewForAdmin(@RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "limit", required = false) Integer limit) {
        PagingModel result = new PagingModel();
        if (page != null && limit != null) {
            result.setPage(page);
            Pageable pageable = PageRequest.of(page - 1, limit);
            result.setListResult(parrotSpeciesService.findAll(pageable));
            result.setTotalPage(((int) Math.ceil((double) (parrotSpeciesService.totalItemForAdmin()) / limit)));
            result.setLimit(limit);
        } else {
            result.setListResult(parrotSpeciesService.findAll());
        }

        return result;
    }

    @GetMapping(value = "parrot-species/sort")
    public PagingModel showSort(@RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "limit", required = false) Integer limit,  @RequestParam(value = "sortway", required = false) String sortway) {
        PagingModel result = new PagingModel();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);
        if ( sortway == null || sortway.equals("")) {
            result.setListResult(parrotSpeciesService.findAll(pageable));


        } else {

            result.setListResult(parrotSpeciesService.findAllByPriceAndName(sortway, pageable));
            result.setTotalPage(((int) Math.ceil((double) (parrotSpeciesService.totalItem()) / limit)));
            result.setLimit(limit);

        }
        return result;
    }

    @GetMapping(value = "parrot-species/search")
    public PagingModel showSearch(@RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "limit", required = false) Integer limit,  @RequestParam(value = "name", required = false) String name) {
        PagingModel result = new PagingModel();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);
        if ( name == null || name.equals("")) {
            result.setListResult(parrotSpeciesService.findAll(pageable));

        } else {

            result.setListResult(parrotSpeciesService.findAllByName(name, pageable));
            result.setTotalPage(((int) Math.ceil((double) (parrotSpeciesService.totalItem()) / limit)));
            result.setLimit(limit);

        }


        return result;
    }

    @PostMapping(value = "admin/parrot-species/create")
    public ParrotSpeciesDTO createParrotSpecies(@RequestBody ParrotSpeciesDTO model) {
        return (ParrotSpeciesDTO) parrotSpeciesService.save(model);
    }

    @PutMapping(value = "admin/parrot-species/update/{id}")
    public ParrotSpeciesDTO updateParrotSpecies(@RequestBody ParrotSpeciesDTO model, @PathVariable("id") long id) {
        model.setId(id);
        return (ParrotSpeciesDTO) parrotSpeciesService.save(model);
    }

    @DeleteMapping(value = "admin/parrot-species/change-status/{ids}")
    public void deleteParrotSpecies(@RequestBody @PathVariable("ids") Long ids) {
        parrotSpeciesService.changeStatus(ids);
    }

    @GetMapping(value = "admin/parrot-species/search_sort")
    public PagingModel adminSearchSort(@RequestBody @RequestParam(value = "page", required = false) Integer page,
                                       @RequestParam(value = "limit", required = false) Integer limit,
                                       @RequestParam(value = "name", required = false) String name,
                                       @RequestParam(value = "quantity", required = false) Long quantity,
                                       @RequestParam(value = "description", required = false) String description,
                                       @RequestParam(value = "origin", required = false) String origin,
                                       @RequestParam(value = "averageWeight", required = false) Double averageWeight,
                                       @RequestParam(value = "parrotAverageRating", required = false) Double parrotAverageRating,
                                       @RequestParam(value = "status", required = false) Boolean status,
                                       @RequestParam(value = "searchDate", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date searchDate,
                                       @RequestParam(value = "sortName", required = false) String sortName,
                                       @RequestParam(value = "sortQuantity", required = false) String sortQuantity,
                                       @RequestParam(value = "sortOrigin", required = false) String sortOrigin,
                                       @RequestParam(value = "sortAverageWeight", required = false) String sortAverageWeight,
                                       @RequestParam(value = "sortParrotAverageRating", required = false) String sortParrotAverageRating,
                                       @RequestParam(value = "sortDate", required = false) String sortDate
    ){
        PagingModel result = new PagingModel();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);

        result.setListResult(parrotSpeciesService.searchSortForAdmin(name, quantity, description, origin, averageWeight, parrotAverageRating, status, searchDate, sortName, sortQuantity, sortOrigin, sortAverageWeight, sortParrotAverageRating, sortDate, pageable));
        result.setTotalPage(((int) Math.ceil((double) (parrotSpeciesService.totalItemForAdmin()) / limit)));
        result.setLimit(limit);

        return result;
    }
//    @GetMapping(value = "admin/top-3-sales")
//    public List<ParrotSpeciesDTO> top3Sales() {
//
//        return parrotSpeciesService.findTop3HighestSalse();
//    }



    //    @GetMapping(value = "admin/search_sort")
//    public PagingModel adminSearchSort(@RequestBody @RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "limit", required = false) Integer limit, @RequestParam(value = "rating",required = false) Integer rating, @RequestParam(value = "speciesId",required = false) Long speciesId, @RequestParam(value = "date", required = false)  @DateTimeFormat(pattern = "yyyy-MM-dd") Date date, @RequestParam(value = "username",required = false) String username, @RequestParam(value = "status",required = false) Boolean status , @RequestParam(value = "sortRating",required = false) String sortRating, @RequestParam(value = "sortDate",required = false)String sortDate) {
//        PagingModel result = new PagingModel();
//        result.setPage(page);
//        Pageable pageable = PageRequest.of(page - 1, limit);
//
//        result.setListResult(feedbackService.searchSortForAdmin(rating,speciesId,date , username,status,sortRating,sortDate ,pageable));
//        result.setTotalPage(((int) Math.ceil((double) (feedbackService.totalItem()) / limit)));
//        result.setLimit(limit);
//
//
//
//        return result;
//    }
    @GetMapping(value = "parrot-species/search_sort")
    public PagingModel searchSort(@RequestBody @RequestParam(value = "page", required = false) Integer page,
                                  @RequestParam(value = "limit", required = false) Integer limit,
                                  @RequestParam(value = "name", required = false) String name,
                                  @RequestParam(value = "sortName", required = false) String sortName,
                                  @RequestParam(value = "sortParrotAverageRating", required = false) String sortParrotAverageRating,
                                  @RequestParam(value = "sortDate", required = false) String sortDate,
                                  @RequestParam(value = "sortPrice", required = false) String sortPrice

    ){
        PagingModel result = new PagingModel();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);

        result.setListResult(parrotSpeciesService.searchSort(name, sortName, sortParrotAverageRating, sortDate, sortPrice,pageable));
        result.setTotalPage(((int) Math.ceil((double) (parrotSpeciesService.totalItemForAdmin()) / limit)));
        result.setLimit(limit);

        return result;
    }
    @GetMapping(value = "admin/parrot-species/find-top3-sale")
    public List<ParrotSpeciesDTO> findTop3Sale() {
        return  parrotSpeciesService.findTop3Sale();
    }

    @GetMapping(value = "marketer/parrot-species/find-top3-sale")
    public List<ParrotSpeciesDTO> findTop3SaleForMarketing() {
        return  parrotSpeciesService.findTop3Sale();
    }

    @GetMapping(value = "marketer/parrot-species/find-top-sale-price-by-species-id/{id}")
    public Double findTopsalePriceBySpeciesId(@RequestBody @PathVariable("id") Long id) {
        return  parrotSpeciesService.findTopSalePrice(id);
    }

    @GetMapping(value = "marketer/parrot-species/find-top3-sale-count")
    public List<ParrotSpeciesDTO> findTop3saleCount() {
        return  parrotSpeciesService.findTop3SaleCount();
    }

    @GetMapping(value = "marketer/parrot-species/find-top3-sale-count/{id}")
    public Integer findTop3saleCountValue(@RequestBody @PathVariable("id") Long id) {
        return  parrotSpeciesService.findTopSaleCountValue(id);
    }

    @GetMapping(value = "marketer/parrot-species/find-top3-average-rating")
    public List<ParrotSpeciesDTO> findTop3AverageRating() {
        return  parrotSpeciesService.findTop3Averagerating();
    }


    @GetMapping(value = "parrot-species/find-one-species-by-name/{name}")
    public ParrotSpeciesDTO findOneSpeciesById(@RequestBody @PathVariable("name") String name) {
        ParrotSpeciesDTO parrotSpeciesDTO =  parrotSpeciesService.findOneByName(name);
        if(parrotSpeciesDTO != null) return parrotSpeciesDTO;
        return null;
    }
}