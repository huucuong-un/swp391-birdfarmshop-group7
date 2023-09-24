//package com.eleventwell.parrotfarmshop.converter;
//
//import com.eleventwell.parrotfarmshop.dto.PostDTO;
//import com.eleventwell.parrotfarmshop.entity.PostEntity;
//import org.springframework.stereotype.Component;
//
//@Component
//public class PostConverter {
//    public PostDTO toDTO(PostEntity entity){
//        PostDTO dto = new PostDTO();
//        if(entity.getId() != null){
//            dto.setId(entity.getId());
//        }
//        dto.setPostTitle(entity.getTitle());
//        dto.setPostContent(entity.getContent());
//        dto.setPostImageURL(entity.getImageUrl());
//        dto.setStartDate(entity.getStartDate());
//        dto.setEndDate(entity.getEndDate());
//        dto.setStatus(entity.getStatus());
//        return dto;
//    }
//
//    public PostEntity toEntity(PostDTO dto){
//        PostEntity entity = new PostEntity();
//
//
//        entity.setTitle(dto.getPostTitle());
//        entity.setContent(dto.getPostContent());
//        entity.setImageUrl(dto.getPostImageURL());
//        entity.setStartDate(dto.getStartDate());
//        entity.setEndDate(dto.getEndDate());
//        entity.setStatus(dto.getStatus());
//
//        return entity;
//    }
//
//    public PostEntity toEntity(PostDTO dto, PostEntity entity){
//
//        entity.setTitle(dto.getPostTitle());
//        entity.setContent(dto.getPostContent());
//        entity.setImageUrl(dto.getPostImageURL());
//        entity.setStartDate(dto.getStartDate());
//        entity.setEndDate(dto.getEndDate());
//        entity.setStatus(dto.getStatus());
//
//        return entity;
//    }
//}
