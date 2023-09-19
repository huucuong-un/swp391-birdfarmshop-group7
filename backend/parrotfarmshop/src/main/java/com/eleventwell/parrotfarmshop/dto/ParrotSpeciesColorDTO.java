/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eleventwell.parrotfarmshop.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 *
 * @author Admin
 */
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ParrotSpeciesColorDTO extends BaseDTO {
    private Long parrotSpeciesColorPrice;
    private String parrotSpeciesColorImageUrl;
    private String color;
    private long parrotSpeciesID; // This field represents the ID of the related ParrotSpeciesEntity
    private List<ParrotDTO> parrots;
    
    
}
