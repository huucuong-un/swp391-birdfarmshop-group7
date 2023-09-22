package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.dto.RoleDTO;
import com.eleventwell.parrotfarmshop.output.ListOutput;
import com.eleventwell.parrotfarmshop.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/role")
public class RoleController {
    @Autowired
    private IRoleService roleService;

    @GetMapping
    public ListOutput showRoles() {
        ListOutput results = new ListOutput();

        results.setListResult(roleService.findAll());
        return results;
    }

    @PostMapping
    public RoleDTO createRole(@RequestBody RoleDTO model) {
        return roleService.save(model);
    }

    //accept editing description and status only
    @PutMapping(value = "{id}")
    public RoleDTO updateRole(@RequestBody RoleDTO model, @PathVariable("id") long id) {
        model.setId(id);
        return roleService.save(model);
    }


}
