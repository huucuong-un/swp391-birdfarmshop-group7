package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findOneById(Long id);

    List<UserEntity> findAllByOrderByIdDesc();
    Optional<UserEntity> findByEmail(String email);

    UserEntity findOneByUserName(String userName);

    @Query("SELECT COUNT(u) from UserEntity u where( :role IS NULL OR u.role.name = :role)")
    Integer countAllByRole(@Param("role") String role);


}
