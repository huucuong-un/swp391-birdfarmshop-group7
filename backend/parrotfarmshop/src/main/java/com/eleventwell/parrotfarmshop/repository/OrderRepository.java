package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.DeliveryInformationEntity;
import com.eleventwell.parrotfarmshop.entity.OrderDetailEntity;
import com.eleventwell.parrotfarmshop.entity.OrderEntity;
import com.eleventwell.parrotfarmshop.entity.ParrotSpeciesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.Date;
import java.util.List;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    OrderEntity findOneById(Long id);
    List<OrderEntity> findAllByOrderByIdDesc(Pageable pageable);

//    Integer countAllByIdContaining();

    @Query("SELECT ps FROM OrderEntity ps " +
            "WHERE ps.user.id = :userId " +
            "AND (:dateSearch IS NULL OR DATE(ps.createdDate) = :dateSearch)"+
            "AND (:status IS NULL OR ps.status = :status)"+

            "ORDER BY  " +
            "CASE WHEN :sortPrice ='PDESC' THEN ps.totalPrice  END DESC ," +
            "CASE WHEN :sortPrice ='PASC' THEN ps.totalPrice  END ASC ,"+
            "CASE WHEN :sortDate ='DDESC' THEN ps.id END DESC ," +
            "CASE WHEN :sortDate ='DASC' THEN ps.id  END ASC ,"+
            "ps.id desc")
List<OrderEntity> findAllByUserIdOrderByIdDescANDSearchSort(@Param("userId") Long id,@Param("dateSearch") Date dateSearch,@Param("status") String status,@Param("sortPrice") String sortPrice ,@Param("sortDate") String sortDate,Pageable pageable);


    @Query("SELECT ps FROM OrderEntity ps " +
            "WHERE (:email IS NULL OR ps.user.email LIKE CONCAT('%', :email, '%')) " +
            "AND (:phone IS NULL OR ps.deliveryInformation.phoneNumber LIKE CONCAT('%', :phone, '%'))  " +
             "AND (:dateSearch IS NULL OR DATE(ps.createdDate) = :dateSearch)"+
            "AND (:status IS NULL OR ps.status = :status)"+

            "ORDER BY  " +
            "CASE WHEN :sortPrice ='PDESC' THEN ps.totalPrice  END DESC ," +
            "CASE WHEN :sortPrice ='PASC' THEN ps.totalPrice  END ASC ,"+
            "CASE WHEN :sortDate ='DDESC' THEN ps.id END DESC ," +
            "CASE WHEN :sortDate ='DASC' THEN ps.id  END ASC ,"+
            "ps.id desc")
    List<OrderEntity> searchByEmailOrPhone(@Param("email") String email, @Param("phone") String phone , @Param("dateSearch") Date dateSearch,@Param("status") String status,@Param("sortPrice") String sortPrice ,@Param("sortDate") String sortDate,Pageable pageable );

    Integer countByStatusEquals(String status);

    @Query("SELECT COUNT(r) FROM OrderEntity r WHERE DATE(r.createdDate) = DATE(:today)")
    Integer countByCreatedDate(@Param("today") Date today);

    @Query("SELECT COUNT(r) FROM OrderEntity r WHERE YEAR(r.createdDate) = YEAR(:today) AND MONTH(r.createdDate) = MONTH(:today)")
    Integer countByCreatedDateInCurrentMonth(@Param("today") Date today);

    @Query("SELECT COUNT(r) FROM OrderEntity r WHERE YEAR(r.createdDate) = YEAR(:today)")
    Integer countByCreatedDateInCurrentYear(@Param("today") Date today);

    @Query("SELECT SUM(o.totalPrice) FROM OrderEntity o WHERE o.status = 'Paid' AND DATE(o.createdDate) = DATE(:today)")
    Double sumTotalPriceForDoneOrdersToday(@Param("today") Date today);

    @Query("SELECT SUM(o.totalPrice) FROM OrderEntity o WHERE o.status = 'Paid' AND YEAR(o.createdDate) = YEAR(CURDATE()) AND MONTH(o.createdDate) = MONTH(CURDATE())")
    Double sumTotalPriceForDoneOrdersInCurrentMonth();

    @Query("SELECT SUM(o.totalPrice) FROM OrderEntity o WHERE o.status = 'Paid' AND YEAR(o.createdDate) = YEAR(CURDATE())")
    Double sumTotalPriceForDoneOrdersInCurrentYear();

    @Query("SELECT SUM(o.totalPrice) FROM OrderEntity o WHERE o.status = 'Paid' AND MONTH(o.createdDate) = 1")
    Double sumTotalPriceForDoneOrdersInJanuary();

    @Query("SELECT SUM(o.totalPrice) FROM OrderEntity o WHERE o.status = 'Paid' AND MONTH(o.createdDate) = 2")
    Double sumTotalPriceForDoneOrdersInFebruary();

    @Query("SELECT SUM(o.totalPrice) FROM OrderEntity o WHERE o.status = 'Done' AND MONTH(o.createdDate) = 3")
    Double sumTotalPriceForDoneOrdersInMarch();

    @Query("SELECT SUM(o.totalPrice) FROM OrderEntity o WHERE o.status = 'Paid' AND MONTH(o.createdDate) = 4")
    Double sumTotalPriceForDoneOrdersInApril();

    @Query("SELECT SUM(o.totalPrice) FROM OrderEntity o WHERE o.status = 'Paid' AND MONTH(o.createdDate) = 5")
    Double sumTotalPriceForDoneOrdersInMay();

    @Query("SELECT SUM(o.totalPrice) FROM OrderEntity o WHERE o.status = 'Paid' AND MONTH(o.createdDate) = 6")
    Double sumTotalPriceForDoneOrdersInJune();

    @Query("SELECT SUM(o.totalPrice) FROM OrderEntity o WHERE o.status = 'Paid' AND MONTH(o.createdDate) = 7")
    Double sumTotalPriceForDoneOrdersInJuly();

    @Query("SELECT SUM(o.totalPrice) FROM OrderEntity o WHERE o.status = 'Paid' AND MONTH(o.createdDate) = 8")
    Double sumTotalPriceForDoneOrdersInAugust();

    @Query("SELECT SUM(o.totalPrice) FROM OrderEntity o WHERE o.status = 'Paid' AND MONTH(o.createdDate) = 9")
    Double sumTotalPriceForDoneOrdersInSeptember();

    @Query("SELECT SUM(o.totalPrice) FROM OrderEntity o WHERE o.status = 'Paid' AND MONTH(o.createdDate) = 10")
    Double sumTotalPriceForDoneOrdersInOctober();

    @Query("SELECT SUM(o.totalPrice) FROM OrderEntity o WHERE o.status = 'Paid' AND MONTH(o.createdDate) = 11")
    Double sumTotalPriceForDoneOrdersInNovember();

    @Query("SELECT SUM(o.totalPrice) FROM OrderEntity o WHERE o.status = 'Paid' AND MONTH(o.createdDate) = 12")
    Double sumTotalPriceForDoneOrdersInDecember();

    @Query("SELECT o.orderId from OrderDetailEntity o where o.nestUsageHistory.id = :usageId")
    OrderEntity findOneByUsageHistory(@Param("usageId") Long usageId);


    @Query("SELECT o.deliveryInformation from OrderEntity o where o.id = :orderId")
    DeliveryInformationEntity findOneByOrderId(@Param("orderId")Long orderId);
}
