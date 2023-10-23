package com.eleventwell.parrotfarmshop.dto;

import lombok.*;

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
