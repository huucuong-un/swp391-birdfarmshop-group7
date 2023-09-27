package com.eleventwell.parrotfarmshop.entity;
//*ParrotEggNestID
//ParrotMomID
//ParrotDadID
//ParrotEggNestStatus
//CreatedAt
//CreatedBy

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;

import jdk.jfr.Unsigned;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
@Table(name = "parrotEggNest")
public class ParrotEggNestEntity extends BaseEntity {

    @Column(name = "status")
    private Boolean status;

    @Column(name="breed_status")
    private String breedStatus;

    @Column(name = "sale_status")
    private Boolean saleStatus;

    @Column(name = "price")
    private Double price;

    @ManyToOne
    @JoinColumn(name ="species_egg_price_id" )
    private SpeciesEggPriceEntity speciesEggPrice;

//    @OneToOne(mappedBy = "parrotEggNest")
//    private OrderDetailEntity orderDetailEntity;
    @OneToOne(mappedBy = "parrotEggNest")
    @PrimaryKeyJoinColumn
    private OrderDetailEntity orderDetail;

    @OneToMany(mappedBy = "parrotEggNest")
    private List<ParrotEntity> parrots = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "parrotMomID")
    private ParrotEntity parrotMom;

    @ManyToOne
    @JoinColumn(name = "parrotDadID")
    private ParrotEntity parrotDad;

    @Unsigned
    @Column(name = "belongTo")
    private Integer belongTo;

}
