package com.eleventwell.parrotfarmshop.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import jakarta.validation.constraints.PositiveOrZero;
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="nest_price")
public class NestPriceEntity extends BaseEntity {

  @OneToOne
  @JoinColumn(name="species_id")
  private ParrotSpeciesEntity parrotSpecies;


  @OneToMany(mappedBy = "nestPrice")
  List<NestEntity> nest = new ArrayList<>();

  @PositiveOrZero
  @Column(name="price")
  private Double price;

  @Column(name = "status")
  private Boolean status;

}
