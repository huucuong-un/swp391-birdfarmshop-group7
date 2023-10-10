package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.FeedbackEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<FeedbackEntity,Long> {
    FeedbackEntity findOneById(Long id);


  @Query("SELECT u FROM FeedbackEntity u WHERE u.parrotSpeciesColor.id = :id order by u.id DESC ")
   List<FeedbackEntity> findAllByParrotSpeciesColorIdAndBelongToOrderByIdDesc(@Param("id")Long id, Pageable pageable);

   @Query("SELECT u FROM FeedbackEntity u where u.parrotSpeciesColor.parrotSpecies.id = :id AND u.belongTo = :belongTo order by u.id DESC ")
    List<FeedbackEntity> findbyspeciescoloridAndType(@Param("id") Long id,@Param("belongTo") String belongTo, Pageable pageable);


    @Query("SELECT ROUND(AVG(f.rating), 1) FROM FeedbackEntity f WHERE f.parrotSpeciesColor.parrotSpecies.id = :colorid")
    Double calculateRoundedAverageRating(@Param("colorid") Long colorid);
    List<FeedbackEntity> findAllByOrderByIdDesc();

    Integer countAllByParrotSpeciesColorId(Long id);
    Integer countAllByParrotSpeciesColorParrotSpeciesId(Long id);


}
