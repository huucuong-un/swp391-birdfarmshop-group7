/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eleventwell.parrotfarmshop.dto;

import com.eleventwell.parrotfarmshop.entity.OrderDetailEntity;
import com.eleventwell.parrotfarmshop.entity.ParrotEggNestEntity;
import com.eleventwell.parrotfarmshop.entity.ParrotSpeciesColorEntity;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 *
 * @author ASUS
 */
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class ParrotDTO extends BaseDTO {
  
    private int age;

    private Boolean availabilityStatus;

    private Boolean pregnancyStatus;

    private Boolean healthStatus;

    private Long numberOfChildren;

    private Long ownerId;

    private Long colorId;

    private Long nestId;

}
