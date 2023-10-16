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
import java.util.List;

import com.eleventwell.parrotfarmshop.service.impl.ParrotSpeciesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

/**
 * @author ASUS
 */
@CrossOrigin
@RestController
@RequestMapping(value = "/api/parrot-species")
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

    @GetMapping(value = "find-one-species-by-id/{id}")
    public List<ParrotSpeciesDTO> findOneSpeciesById(@RequestBody @PathVariable("id") long id) {
        List<ParrotSpeciesDTO> list = new ArrayList<>();
        list.add((ParrotSpeciesDTO) parrotSpeciesService.findOneSpeciesById(id));
        return list;
    }

    @GetMapping(value = "find-one-species-by-parrot-id/{id}")
    public List<ParrotSpeciesDTO> findOneSpeciesByParrotId(@RequestBody @PathVariable("id") long id) {
        List<ParrotSpeciesDTO> list = new ArrayList<>();
        list.add((ParrotSpeciesDTO) parrotSpeciesService.findOneSpeciesParrotById(id));
        return list;
    }
    @GetMapping(value = "find-one-species-by-color-id/{id}")
    public ParrotSpeciesDTO findOneSpeciesByColorId(@RequestBody @PathVariable("id") long id) {

        return (ParrotSpeciesDTO) parrotSpeciesService.findOneSpeciesById(id);

    }

    @GetMapping(value = "")
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

    @GetMapping(value = "sort")
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
    
      @GetMapping(value = "search")
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

    @PostMapping(value = "")
    public ParrotSpeciesDTO createParrotSpecies(@RequestBody ParrotSpeciesDTO model) {
        return (ParrotSpeciesDTO) parrotSpeciesService.save(model);
    }

    @PutMapping(value = "{id}")
    public ParrotSpeciesDTO updateParrotSpecies(@RequestBody ParrotSpeciesDTO model, @PathVariable("id") long id) {
        model.setId(id);
        return (ParrotSpeciesDTO) parrotSpeciesService.save(model);
    }

    @DeleteMapping(value = "{ids}")
    public void deleteParrotSpecies(@RequestBody @PathVariable("ids") Long ids) {
        parrotSpeciesService.changeStatus(ids);
    }
}
