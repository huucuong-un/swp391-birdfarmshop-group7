package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.converter.Converter;
import com.eleventwell.parrotfarmshop.dto.PostDTO;
import com.eleventwell.parrotfarmshop.entity.PostEntity;
import com.eleventwell.parrotfarmshop.repository.ParrotRepository;
import com.eleventwell.parrotfarmshop.repository.PostRepository;
import com.eleventwell.parrotfarmshop.service.IPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PostService  implements IPostService {



    @Autowired
    private PostRepository postRepository;


    @Autowired
    private Converter converter;

    @Override
    public List<PostDTO> findAll() {
        List<PostDTO> result = new ArrayList<>();
        List<PostEntity> entities = postRepository.findAll();

        for (PostEntity entity : entities){
            PostDTO postDTO = (PostDTO) converter.toDTO(entity, PostDTO.class);
            result.add(postDTO);
        }
        return result;
    }

    @Override
    public PostDTO save(PostDTO postDTO) {
        PostEntity postEntity = new PostEntity();
        if(postDTO.getId() != null){
            PostEntity oldEntity = postRepository.findOneById(postDTO.getId());
            postEntity = (PostEntity) converter.updateEntity(postDTO, oldEntity);
        }else{
            postEntity = (PostEntity) converter.toEntity(postDTO, PostEntity.class);
        }
        postRepository.save(postEntity);
        return (PostDTO) converter.toDTO(postEntity, PostDTO.class);
    }

    @Override
    public void delete(long[] ids) {
        for (long id: ids
             ) {
            postRepository.deleteById(id);

        }
    }
}
