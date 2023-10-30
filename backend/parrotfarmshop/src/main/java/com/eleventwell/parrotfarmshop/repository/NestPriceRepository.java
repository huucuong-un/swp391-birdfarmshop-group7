package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.FAQEntity;
import com.eleventwell.parrotfarmshop.entity.NestPriceEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface NestPriceRepository extends JpaRepository<NestPriceEntity,Long> {

    NestPriceEntity findOneById(Long id);

    NestPriceEntity findOneByParrotSpeciesId(Long id);


    List<NestPriceEntity> findAllByOrderByIdDesc();

    @Query("SELECT u FROM NestPriceEntity u WHERE (:searchDate IS NULL OR DATE(u.createdDate) = :searchDate) AND (:status IS NULL OR u.status = :status)"+
            "ORDER BY " +
            "CASE WHEN :sortPrice = 'PASC' THEN u.price END ASC , " +
            "CASE WHEN :sortPrice = 'PDESC' THEN u.price END DESC, "+
            "u.id DESC")
    List<NestPriceEntity> searchSortForNestPrice(@Param("searchDate") Date searchDate, @Param("status") Boolean status, @Param("sortPrice") String sortPrice, Pageable pageable);
}
