package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
    RoleEntity findOneById(Long id);
}
