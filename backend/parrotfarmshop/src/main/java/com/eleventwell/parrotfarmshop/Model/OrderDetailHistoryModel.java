package com.eleventwell.parrotfarmshop.Model;

import lombok.*;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderDetailHistoryModel {

    String img;
    String SpeciesName;
    String color;
    Long colorId;
    Long orderDetailId;
    Integer quantity;
    Double totalPrice;
    Double price;



}
