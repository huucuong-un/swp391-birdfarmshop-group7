package com.eleventwell.parrotfarmshop.dto;

import com.eleventwell.parrotfarmshop.entity.ParrotEggNestEntity;
import com.eleventwell.parrotfarmshop.entity.ParrotSpeciesEntity;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SpeciesEggPriceDTO extends BaseDTO {

    private Long speciesId;

    private Double price;

    private Integer quantity;

    private Boolean status;
}
