package com.eleventwell.parrotfarmshop.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="species_egg_price")
public class SpeciesEggPriceEntity extends BaseEntity {

  @ManyToOne
  @JoinColumn(name="species_id")
  private ParrotSpeciesEntity parrotSpecies;


  @OneToMany(mappedBy = "speciesEggPrice")
    List<ParrotEggNestEntity> parrotEggNests = new ArrayList<>();
  @Column(name="price")
    private Double price;

  @Column(name="quantity")
  private Integer quantity;

  @Column(name = "status")
  private Boolean status;

}
