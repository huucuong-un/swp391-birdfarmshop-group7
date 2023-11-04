package com.eleventwell.parrotfarmshop.repository;


import com.eleventwell.parrotfarmshop.entity.FAQEntity;
import io.jsonwebtoken.lang.Strings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.data.domain.Pageable;
import java.util.Date;
import java.util.List;

public interface FAQsRepositoty extends JpaRepository<FAQEntity, Long> {

    FAQEntity findOneById(long id);
    List<FAQEntity> findAllByOrderByIdDesc();
    List<FAQEntity> findAllByStatus(boolean status);

    @Query("SELECT u FROM FAQEntity u WHERE  (:searchTitle IS NULL OR u.title LIKE CONCAT('%', :searchTitle ,'%')) AND (:searchDate IS NULL OR DATE(u.createdDate) = :searchDate) AND (:status IS NULL OR u.status = :status)"+
            "ORDER BY " +
            "CASE WHEN :sortTitle = 'TASC' THEN substring(u.title,1,1) END ASC , " +
            "CASE WHEN :sortTitle = 'TDESC' THEN substring(u.title,1,1) END DESC, "+
            "u.id DESC")

    List<FAQEntity> searchSortForFaqs(@Param("searchTitle") String searchTitle, @Param("searchDate") Date searchDate, @Param("status") Boolean status, @Param("sortTitle") String sortTitle, Pageable pageable);


}
