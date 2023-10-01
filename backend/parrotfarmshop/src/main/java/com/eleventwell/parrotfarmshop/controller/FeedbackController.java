package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.dto.FeedbackDTO;
import com.eleventwell.parrotfarmshop.dto.OrderDetailDTO;
import com.eleventwell.parrotfarmshop.repository.FeedbackRepository;
import com.eleventwell.parrotfarmshop.service.impl.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<FeedbackDTO> showAllFeedback(){
        return feedbackService.findAll();

    }
    @GetMapping(value = "find-All-By-Species-Id-And-Belongto/{speciesId}/{productType}")
    public List<FeedbackDTO> findAllBySpeciesIdAndBelongTo(@RequestBody @PathVariable("speciesId") Long speciesId, @PathVariable("productType") String productType) {
            return feedbackService.findAllBySpeciesIdAndBelongto(speciesId,productType);

    }
    @PostMapping(value = "")
    public FeedbackDTO createFeedback(@RequestBody FeedbackDTO dto){

return feedbackService.save(dto);
    }


}
