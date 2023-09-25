package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.dto.BaseDTO;
import com.eleventwell.parrotfarmshop.entity.BaseEntity;
import org.springframework.context.annotation.Scope;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Repository;

@NoRepositoryBean
public interface GenericRepository<T extends BaseEntity> extends JpaRepository<T, Long> {
    T findOneById(Long id);
}