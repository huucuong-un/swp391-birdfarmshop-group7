package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.dto.RoleDTO;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import com.eleventwell.parrotfarmshop.service.impl.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api")
public class RoleController {
    @Autowired
    private IGenericService roleService;

    @Autowired
    RoleService roleServiceConcrete;

    @GetMapping(value ="role")
    public List<RoleDTO> showRoles() {
        List<RoleDTO> list = roleService.findAll();
        return list;
    }

    @GetMapping(value ="admin/role")
    public List<RoleDTO> showRolesForAdmin() {
      List<RoleDTO> list = roleService.findAll();
        return list;
    }

    @PostMapping(value ="admin/role")
    public RoleDTO createRole(@RequestBody RoleDTO model) {
        return (RoleDTO) roleService.save(model);
    }

    //accept editing description and status only
    @PutMapping(value = "admin/role/{id}")
    public RoleDTO updateRole(@RequestBody RoleDTO model, @PathVariable("id") Long id) {
        model.setId(id);
        return (RoleDTO) roleService.save(model);
    }

    @DeleteMapping(value = "admin/role/{id}")
    public void changeStatus(@RequestBody @PathVariable("id") Long id){
        roleService.changeStatus(id);
    }

    @PostMapping(value = "admin/role/{id}")
    public void findRoleById(@PathVariable("id") Long id) { roleServiceConcrete.findOneById(id);}

    @GetMapping(value = "role/find-one-by-id/{id}")
    public String findRoleByIdPublic(@PathVariable("id") Long id) { return roleServiceConcrete.findOneById(id).getName();}

}
