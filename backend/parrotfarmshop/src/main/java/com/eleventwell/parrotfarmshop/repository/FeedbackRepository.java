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


    @Query("SELECT u FROM FeedbackEntity u WHERE u.parrotSpeciesColor.id = :id  order by u.id DESC ")
    List<FeedbackEntity> findAllByParrotSpeciesColorIdAndBelongToOrderByIdDesc(@Param("id")Long id, Pageable pageable);

    @Query("SELECT u FROM FeedbackEntity u where u.parrotSpeciesColor.parrotSpecies.id = :speciesId AND u.belongTo = :belongTo AND (:rating IS NULL OR u.rating = :rating) AND (:colorId IS NULL OR u.parrotSpeciesColor.id = :colorId)  order by u.id DESC ")
    List<FeedbackEntity> findbyspeciesIdAndType(@Param("speciesId") Long id,@Param("belongTo") String belongTo,@Param("rating") Integer rating,@Param("colorId") Long colorId, Pageable pageable);


    @Query("SELECT ROUND(AVG(f.rating), 1) FROM FeedbackEntity f WHERE f.parrotSpeciesColor.parrotSpecies.id = :colorid")
    Double calculateRoundedAverageRating(@Param("colorid") Long colorid);
    List<FeedbackEntity> findAllByOrderByIdDesc();


    Integer countAllByOrderIdId(Long id);


    Integer countAllByRating(Integer id);

    @Query("SELECT COUNT(u) FROM FeedbackEntity u   WHERE (:speciesId IS NULL OR u.rating = :speciesId) AND (:rating IS NULL OR u.rating = :rating) AND (:colorId IS NULL OR u.parrotSpeciesColor.id = :colorId)")

    Integer countAllByParrotSpeciesColorIdAndRating(@Param("speciesId") Long speciesId,@Param("colorId") Long colorId,@Param("rating") Integer rating);
    Integer countAllByParrotSpeciesColorParrotSpeciesId(Long colorId);

    List<FeedbackEntity> findAllByRatingOrderByIdDesc(Integer rating);


    @Query("SELECT u FROM FeedbackEntity u     WHERE (:rating IS NULL OR u.rating = :rating) AND (:colorId IS NULL OR u.parrotSpeciesColor.id = :colorId)")
    List<FeedbackEntity> findAllByRatingAndSpeciesColorId(@Param("rating") Integer rating,@Param("colorId") Long colorId,Pageable pageable);

}