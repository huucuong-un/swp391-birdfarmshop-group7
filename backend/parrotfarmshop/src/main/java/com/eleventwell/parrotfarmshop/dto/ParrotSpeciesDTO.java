/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eleventwell.parrotfarmshop.dto;

import lombok.AllArgsConstructor;
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
public class ParrotSpeciesDTO extends BaseDTO {
   
	private String parrotSpeciesName;
	

	private Long parrotSpeciesQuantity;
	
	
	private Long parrotSpeciesNestQuantity;
		
	
	private String parrotSpeciesDescription;

	
	private Boolean availabilityStatus;
	
	
	private String parrotSpeciesOrigin;
	
	
	private Double parrotSpeciesAverageWeight;
	
	
	private Double parrotAverageRating;
	
	
	private Double nestAverageRating;
	
}
