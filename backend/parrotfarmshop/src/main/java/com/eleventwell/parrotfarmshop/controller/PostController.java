package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.Model.PagingModel;
import com.eleventwell.parrotfarmshop.dto.PostDTO;
import com.eleventwell.parrotfarmshop.entity.PostEntity;
import com.eleventwell.parrotfarmshop.output.ListOutput;
import com.eleventwell.parrotfarmshop.service.impl.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api")
public class PostController {

    @Autowired
    PostService postService;

    @GetMapping(value="post")
    public ListOutput showPosts() {
        ListOutput result = new ListOutput();
        result.setListResult(postService.findAll());
        return  result;
    }

    @GetMapping(value="marketer/post")
    public ListOutput showPostsForMarketer() {
        ListOutput result = new ListOutput();
        result.setListResult(postService.findAll());
        return  result;
    }

    @GetMapping(value="marketer/post/find-one-by-id")
    public PostDTO showPostsByIdForMarketer(@RequestBody @RequestParam("postId") Long id) {

        return postService.findOneById(id);
    }
    
     @GetMapping(value="post/find-one-by-id")
    public PostDTO showPosts(@RequestBody @RequestParam("postId") Long id) {
        
       return postService.findOneById(id);
    }



    @PostMapping(value="marketer/post")
    public PostDTO createPost(@RequestBody PostDTO model){
        return (PostDTO) postService.save(model);
    }

    @PutMapping(value="marketer/post/{id}")
    public PostDTO updatePost(@RequestBody PostDTO model,@PathVariable("id") long id){
        model.setId(id);
        return (PostDTO) postService.save(model);
    }

//    @DeleteMapping(value = "")
//    public void deletePost(@RequestBody long[] ids){
//        postService.delete(ids);
//    }
    @DeleteMapping(value = "marketer/post/{id}")
    public void changeStatus(@RequestBody @PathVariable("id") Long id){
        postService.changeStatus(id);
    }

    @GetMapping(value = "marketer/post/search_sort")
    public PagingModel adminSearchSort(@RequestBody @RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "limit", required = false) Integer limit,
                                       @RequestParam(value = "title", required = false) String title,
                                       @RequestParam(value = "content", required = false) String content,
                                       @RequestParam(value = "description", required = false) String description,
                                       @RequestParam(value = "searchDate", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date searchDate,
                                       @RequestParam(value = "status", required = false) Boolean status,
                                       @RequestParam(value = "sortTitle", required = false) String sortTitle,
                                       @RequestParam(value = "sortDate", required = false) String sortDate
                                       ){
        PagingModel result = new PagingModel();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);

        result.setListResult(postService.searchSortForAdmin(title, content, description, searchDate, status, sortTitle, sortDate, pageable));
        result.setTotalPage(((int) Math.ceil((double) (postService.totalItem()) / limit)));
        result.setLimit(limit);
        return  result;
    }

    @GetMapping(value = "post/true-status")
    public List<PostDTO> findAllByTrueStatus() {
        return postService.findAllByStatusTrue();
    }
//    @GetMapping(value = "admin/search_sort")
//    public PagingModel adminSearchSort(@RequestBody @RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "limit", required = false) Integer limit,
//                                       @RequestParam(value = "date", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date date,
//                                       @RequestParam(value = "status", required = false) Boolean status,
//                                       @RequestParam(value = "sortDate", required = false) String sortDate,
//                                       @RequestParam(value = "name", required = false) String name)
//    {
//        PagingModel result = new PagingModel();
//        result.setPage(page);
//        Pageable pageable = PageRequest.of(page - 1, limit);
//
//        result.setListResult(sliderService.searchSortForAdmin(date, status,name,sortDate , pageable));
//        result.setTotalPage(((int) Math.ceil((double) (sliderService.totalItem()) / limit)));
//        result.setLimit(limit);
//        return  result;
//    }
//    public List<PostDTO> searchSortForAdmin(String title,
//                                            String content,
//                                            String description,
//                                            Date searchDate,
//                                            Boolean status,
//                                            String sortTitle,
//                                            String sortDate,
//                                            Pageable pageable ){
//        List<PostDTO> results = new ArrayList<>();
//        List<PostEntity> entities = postRepository.searchSortForAdmin(title, content, description, searchDate, status, sortTitle, sortDate, pageable);
//        for (PostEntity postEntity : entities
//        ) {
//            PostDTO newDTO = (PostDTO) genericConverter.toDTO(postEntity, PostDTO.class);
//            results.add(newDTO);
//        }
//        return results;
//    }
}



