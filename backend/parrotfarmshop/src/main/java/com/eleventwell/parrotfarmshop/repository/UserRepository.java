package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findOneById(Long id);
    Optional<UserEntity> findByEmail(String email);

}
