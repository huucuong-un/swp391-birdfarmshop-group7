package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.dto.PostDTO;
import com.eleventwell.parrotfarmshop.dto.SliderDTO;
import com.eleventwell.parrotfarmshop.output.ListOutput;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import com.eleventwell.parrotfarmshop.service.impl.SliderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/slider")
public class SliderController {

    @Autowired
    SliderService sliderService;

//    @GetMapping(value="")
//    public ListOutput showPosts() {
//        ListOutput result = new ListOutput();
//        result.setListResult(postService.findAll());
//        return  result;
//    }
//
//    @PostMapping(value="")
//    public PostDTO createPost(@RequestBody PostDTO model){
//        return (PostDTO) postService.save(model);
//    }
//
//    @PutMapping(value="{id}")
//    public PostDTO updatePost(@RequestBody PostDTO model,@PathVariable("id") long id){
//        model.setId(id);
//        return (PostDTO) postService.save(model);

    @GetMapping(value = "")
    public ListOutput showSlider(){
        ListOutput result = new ListOutput();
        result.setListResult(sliderService.findAll());
        return result;
    }
    @GetMapping(value = "/admin/find-one-by-id/{id}")
    public SliderDTO showSlider(@RequestBody @PathVariable("id") Long id){

        return sliderService.findOneById(id);
    }


    @PostMapping(value = "")
    public SliderDTO createSlider(@RequestBody SliderDTO model){
        return (SliderDTO) sliderService.save(model);
    }

    @PutMapping(value= "{id}")
    public SliderDTO updateSlider(@RequestBody SliderDTO model, @PathVariable("id") long id){
        model.setId(id);
        return (SliderDTO) sliderService.save(model);
    }

    @DeleteMapping(value = "{id}")
    public void changeStatus(@RequestBody @PathVariable("id") Long id){
        sliderService.changeStatus(id);
    }


}
