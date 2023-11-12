package com.eleventwell.parrotfarmshop.controller;


import com.eleventwell.parrotfarmshop.Model.PagingModel;
import com.eleventwell.parrotfarmshop.dto.UserDTO;
import com.eleventwell.parrotfarmshop.output.ListOutput;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import com.eleventwell.parrotfarmshop.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api")
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    UserService userService1;



    @GetMapping(value = "user/get-user-by-email/{email}")
    public UserDTO getUserByEmail(@PathVariable("email") String email) {
        if (userService1.findByEmail(email) != null) return userService1.findByEmail(email);
        return null;
    }
    @GetMapping(value = "user/get-user-by-id")
    public UserDTO getUserByEmail(@RequestParam("id") Long id) {
        if (userService1.findOneById(id) != null) return userService1.findOneById(id);
        return null;
    }

    @GetMapping(value = "admin/user")
    public List<UserDTO> showUsers() {
        List<UserDTO> results = userService.findAll();

        return results;
    }
    @GetMapping(value = "user/generate-token")
    public UserDTO generateToken(@RequestBody @RequestParam("token") String token) {


        return userService.generateToken(token);
    }
    @PostMapping(value = "admin/user")
    public UserDTO createUser(@RequestBody UserDTO model) {
        return userService.save(model);
    }

    @PutMapping(value = "user/{id}")
    public UserDTO updateUser(@RequestBody UserDTO model, @PathVariable("id") Long id) {
        model.setId(id);

        return  userService.save(model);
    }

    @DeleteMapping(value = "admin/user/{id}")
    public void changeStatus(@RequestBody @PathVariable("id") Long id){
        userService.changeStatus(id);
    }

    @GetMapping(value =  "user/paging")
    public PagingModel pagingModel (@RequestBody @RequestParam(value = "page") Integer page, @RequestParam(value = "limit") Integer limit){

        PagingModel result = new PagingModel();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);

        result.setListResult(userService.findAll(pageable)) ;
        result.setTotalPage(((int) Math.ceil((double) (userService.totalItem()) / limit)));
        result.setLimit(limit);
        return  result;
    }

    @GetMapping(value =  "user/count-all-by-role/{role}")
    public Integer countByRole (@RequestBody @PathVariable(value = "role") String role ){

        return  userService.countAccountByRole(role);
    }
}
