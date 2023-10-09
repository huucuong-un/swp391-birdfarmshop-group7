package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.Model.PagingModel;
import com.eleventwell.parrotfarmshop.dto.FeedbackDTO;
import com.eleventwell.parrotfarmshop.dto.OrderDetailDTO;
import com.eleventwell.parrotfarmshop.repository.FeedbackRepository;
import com.eleventwell.parrotfarmshop.service.impl.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/feedback")
public class FeedbackController {

    @Autowired
    FeedbackService feedbackService;

    @GetMapping(value = "")
    public List<FeedbackDTO> showAllFeedback() {
        return feedbackService.findAll();

    }

    @GetMapping(value = "find-all-by-species-id-and-belong-to")
    public PagingModel findAllBySpeciesIdAndBelongTo(@RequestBody @RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "limit", required = false) Integer limit, @RequestParam("speciesId") Long speciesId, @RequestParam(value = "productType",required = false) String productType) {
        PagingModel result = new PagingModel();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);

        result.setListResult(feedbackService.findAllBySpeciesIdAndBelongto(speciesId, productType, pageable));
        result.setTotalPage(((int) Math.ceil((double) (feedbackService.totalItem()) / limit)));
        result.setLimit(limit);


        return result;
    }

    @PostMapping(value = "")
    public FeedbackDTO createFeedback(@RequestBody FeedbackDTO dto) {

        return feedbackService.save(dto);
    }


}
