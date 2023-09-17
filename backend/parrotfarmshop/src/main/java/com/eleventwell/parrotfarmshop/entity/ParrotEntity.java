package com.eleventwell.parrotfarmshop.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

/**
 * parrotID:pk parrotName, #parrotSpeciesDetailID: fk #ParrotEggNest parrotAge
 * availabilityStatus pregnancyStatus healthStatus numberOfChildren,
 * ownerID:fk-User parrotMomID:fk parrotDadID:fk
 */
import java.util.ArrayList;
import java.util.List;
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
@Table(name = "parrot")
public class ParrotEntity extends BaseEntity {

    @Column(name = "parrotName")
    private String parrotName;

    @Column(name = "parrotAge")
    private int parrotAge;

    @Column(name = "availabilityStatus")
    private Boolean availabilityStatus;

    @Column(name = "pregnancyStatus")
    private Boolean pregnancyStatus;

    @Column(name = "healthStatus")
    private Boolean healthStatus;

    @Column(name = "numberOfChildren")
    private Long numberOfChildren;

    
    
      @ManyToOne
    @JoinColumn(name = "ownerID")
    private UserEntity owner;

//	
//	
    @ManyToOne
    @JoinColumn(name = "parrotSpeciesDetailID")
    private ParrotSpeciesDetailEntity parrotSpeciesDetail;

    @ManyToOne
    @JoinColumn(name = "parrotEggNestID")
    private ParrotEggNestEntity parrotEggNest;

//    @OneToOne(mappedBy = "parrot")
//    private OrderDetailEntity orderDetail;
    @OneToOne(mappedBy = "parrot")
    @PrimaryKeyJoinColumn
    private OrderDetailEntity orderDetail;
//
//	@OneToMany(mappedBy = "parrot")
//	private List<ParrotEggNestEntity> parrotEggNests = new ArrayList<>();
//	
//	

    @OneToMany(mappedBy = "parrot")
    private List<ReproductiveHistoryEntity> reproductiveHistories = new ArrayList<>();

    @OneToMany(mappedBy = "parrotMom")
    private List<ParrotEggNestEntity> parrotMomInNests = new ArrayList<>();

    @OneToMany(mappedBy = "parrotDad")
    private List<ParrotEggNestEntity> parrotDadInNests = new ArrayList<>();

}
