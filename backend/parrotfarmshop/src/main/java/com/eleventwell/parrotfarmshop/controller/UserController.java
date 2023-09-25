package com.eleventwell.parrotfarmshop.controller;


import com.eleventwell.parrotfarmshop.dto.UserDTO;
import com.eleventwell.parrotfarmshop.output.ListOutput;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/user")
public class UserController {
    @Autowired
    IGenericService<UserDTO> userService;

    @GetMapping(value = "")
    public ListOutput showUsers() {
        ListOutput results = new ListOutput();
        results.setListResult(userService.findAll()) ;

        return results;
    }

    @PostMapping(value = "")
    public UserDTO createUser(@RequestBody UserDTO model) {
        return userService.save(model);
    }

    @PutMapping(value = "{id}")
    public UserDTO updateUser(@RequestBody UserDTO model, @PathVariable("id") Long id) {
        model.setId(id);

        return  userService.save(model);
    }
}
