package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.dto.RoleDTO;
import com.eleventwell.parrotfarmshop.output.ListOutput;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/role")
public class RoleController {
    @Autowired
    private IGenericService roleService;

    @GetMapping
    public List<RoleDTO> showRoles() {
        List<RoleDTO> results = roleService.findAll();
        return results;
    }

    @PostMapping
    public RoleDTO createRole(@RequestBody RoleDTO model) {
        return (RoleDTO) roleService.save(model);
    }

    //accept editing description and status only
    @PutMapping(value = "{id}")
    public RoleDTO updateRole(@RequestBody RoleDTO model, @PathVariable("id") Long id) {
        model.setId(id);
        return (RoleDTO) roleService.save(model);
    }

    @DeleteMapping(value = "{id}")
    public void changeStatus(@RequestBody @PathVariable("id") Long id){
        roleService.changeStatus(id);
    }


}
