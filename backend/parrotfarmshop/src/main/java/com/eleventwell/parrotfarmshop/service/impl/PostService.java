package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.converter.GenericConverter;
import com.eleventwell.parrotfarmshop.dto.PostDTO;
import com.eleventwell.parrotfarmshop.entity.PostEntity;
import com.eleventwell.parrotfarmshop.repository.PostRepository;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PostService implements IGenericService<PostDTO> {


    @Autowired
    private PostRepository postRepository;


    @Autowired
    private GenericConverter genericConverter;

    @Override
    public List<PostDTO> findAll() {
        List<PostDTO> result = new ArrayList<>();
        List<PostEntity> entities = postRepository.findAllByOrderByIdDesc();

        for (PostEntity entity : entities) {
            PostDTO postDTO = (PostDTO) genericConverter.toDTO(entity, PostDTO.class);
            result.add(postDTO);
        }
        return result;
    }

    @Override
    public PostDTO save(PostDTO postDTO) {
        PostEntity postEntity = new PostEntity();
        if (postDTO.getId() != null) {
            PostEntity oldEntity = postRepository.findOneById(postDTO.getId());
            postEntity = (PostEntity) genericConverter.updateEntity(postDTO, oldEntity);
        } else {
            postEntity = (PostEntity) genericConverter.toEntity(postDTO, PostEntity.class);
        }
        postRepository.save(postEntity);
        return (PostDTO) genericConverter.toDTO(postEntity, PostDTO.class);
    }

    @Override
    public void changeStatus(Long ids) {
        PostEntity postEntity = postRepository.findOneById(ids);
        if (postEntity.getStatus() == true) {
            postEntity.setStatus(false);
        } else {
            postEntity.setStatus(true);
        }
        postRepository.save(postEntity);
    }


}
