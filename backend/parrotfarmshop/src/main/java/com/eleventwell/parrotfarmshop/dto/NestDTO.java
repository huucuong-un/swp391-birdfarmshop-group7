package com.eleventwell.parrotfarmshop.dto;


import lombok.*;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class NestDTO extends BaseDTO{

    private Boolean status;


    private Long orderDetailId;



    private Long momId;


    private Long dadId;

    private Boolean saleStatus;

    private Long speciesEggPriceId;

    private String breedStatus;

}
