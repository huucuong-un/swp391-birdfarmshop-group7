package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.FeedbackEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<FeedbackEntity,Long> {
    FeedbackEntity findOneById(Long id);

   List<FeedbackEntity> findAllByParrotSpeciesIdAndBelongToOrderByIdDesc(Long id, String belongTo);

  List<FeedbackEntity> findAllByOrderByIdDesc();
}
