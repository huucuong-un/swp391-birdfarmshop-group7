package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.dto.ParrotColorImageDTO;
import com.eleventwell.parrotfarmshop.service.impl.ParrotColorImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api")
public class ParrotColorImageController {

    @Autowired
    ParrotColorImageService parrotColorImageService;

    @PostMapping("color-image/find-by-color/{colorId}")
    public List<ParrotColorImageDTO> getImagesByColorId(@PathVariable("colorId") Long colorId ) {
        if (colorId == null) return null;
        return parrotColorImageService.findAllByColorId(colorId);
    }

    @PostMapping(value = "admin/color-image")
    public ParrotColorImageDTO addImage(@RequestBody ParrotColorImageDTO image){
        return parrotColorImageService.save(image);
    }

    @PostMapping("color-image/find-by-species/{speciesId}")
    public List<ParrotColorImageDTO> getImagesDTOBySpeciesId(@PathVariable("speciesId") Long speciesId ) {
        if (speciesId == null) return null;
        return parrotColorImageService.findAllBySpeciesId(speciesId);
    }

    @PostMapping("color-image/find-by-species/images/{speciesId}")
    public List<String> getImagesBySpeciesId(@PathVariable("speciesId") Long speciesId ) {
        if (speciesId == null) return null;
        return parrotColorImageService.findAllImagesBySpeciesId(speciesId);
    }

    @DeleteMapping("admin/color-image/delete-image/{imageId}")
    public Boolean deleteImageById(@PathVariable("imageId") Long imageId) {
        if (imageId == null) return false;
        parrotColorImageService.deleteImage(imageId);
        return true;
    }
}
