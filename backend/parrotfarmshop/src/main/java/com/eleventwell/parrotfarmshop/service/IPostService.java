package com.eleventwell.parrotfarmshop.service;

import com.eleventwell.parrotfarmshop.dto.ParrotSpeciesColorDTO;
import com.eleventwell.parrotfarmshop.dto.PostDTO;

import java.util.List;

public interface IPostService {
    List<PostDTO> findAll();
    PostDTO save(PostDTO postDTO);
    void delete(long[] ids);
}
