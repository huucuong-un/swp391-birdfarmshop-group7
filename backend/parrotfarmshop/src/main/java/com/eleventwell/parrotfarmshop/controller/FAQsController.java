package com.eleventwell.parrotfarmshop.controller;

import ch.qos.logback.core.boolex.EvaluationException;
import com.eleventwell.parrotfarmshop.Model.PagingModel;
import com.eleventwell.parrotfarmshop.dto.FAQsDTO;
import com.eleventwell.parrotfarmshop.output.ListOutput;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import com.eleventwell.parrotfarmshop.service.impl.FAQsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@CrossOrigin
@RestController
@RequestMapping(value = "/api")

public class FAQsController {

    @Autowired
    IGenericService<FAQsDTO> faQsDTOIGenericService = new FAQsService();


    @GetMapping(value = "admin/faqs")
    public ListOutput showFAQs() {
        ListOutput result = new ListOutput();
        result.setListResult(faQsDTOIGenericService.findAll());
        return result;
    }
    @GetMapping(value = "/faqs")
    public ListOutput showFQAsForUser(){
        ListOutput result = new ListOutput();
        result.setListResult(((FAQsService) faQsDTOIGenericService).findAllByStatus(true));
        return result;
    }

    @PostMapping(value = "/faqs")
    public FAQsDTO createFaqs(@RequestBody FAQsDTO model) {
        return faQsDTOIGenericService.save(model);
    }

    @PutMapping(value = "/faqs/{id}")
    public FAQsDTO updateFAQs(@RequestBody FAQsDTO model, @PathVariable("id") long id) {
        model.setId(id);
        return faQsDTOIGenericService.save(model);
    }

    @DeleteMapping(value = "/faqs/{id}")
    public void deleteFAQs(@RequestBody @PathVariable("id") long id) {

        faQsDTOIGenericService.changeStatus(id);
    }

    @GetMapping(value = "admin/faqs/search_sort")
    public PagingModel searchSortFor(@RequestBody @RequestParam(value = "page", required = false) Integer page,
                                     @RequestParam(value = "limit", required = false) Integer limit,
                                     @RequestParam(value = "searchTitle", required = false) String searchTitle,
                                     @RequestParam(value = "searchDate", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date searchDate,
                                     @RequestParam(value = "status", required = false) Boolean status,
                                     @RequestParam(value = "sortTitle", required = false) String sortTitle
                                     ) {
        PagingModel result = new PagingModel();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);

        result.setListResult(((FAQsService) faQsDTOIGenericService).searchSortForFaqs(searchTitle, searchDate, status, sortTitle, pageable));
        result.setTotalPage(((int) Math.ceil((double) (faQsDTOIGenericService.totalItem()) / limit)));
        result.setLimit(limit);
        return result;
    }




}