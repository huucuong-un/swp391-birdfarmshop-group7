package com.eleventwell.parrotfarmshop.dto;


import com.eleventwell.parrotfarmshop.entity.OrderDetailEntity;
import com.eleventwell.parrotfarmshop.entity.ParrotEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ParrotEggNestDTO extends BaseDTO{

    private String parrotEggNestStatus;


    private Long orderDetailId;

    private List<ParrotEntity> parrots = new ArrayList<>();


    private Long parrotMomId;


    private Long parrotDadId;
}
