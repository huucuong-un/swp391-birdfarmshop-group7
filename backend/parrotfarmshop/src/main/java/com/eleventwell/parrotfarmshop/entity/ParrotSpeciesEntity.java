package com.eleventwell.parrotfarmshop.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter


//parrotSpeciesID:pk, parrotSpeciesName, parrotSpeciesQuantity, parrotSpeciesPrice
//parrotSpeciesDescription, createdBy:fk, createdAt, availabilityStatus, parrotSpeciesOrigin, 
//parrotSpeciesAverageWeight, averageRating
@Entity
@Table(name = "parrotSpecies")
public class ParrotSpeciesEntity extends BaseEntity{
	@Column(name = "parrotSpeciesName")
	private String parrotSpeciesName;
	
	@Column(name = "parrotSpeciesQuantity")
	private Long parrotSpeciesQuantity;
	
	@Column(name = "parrotSpeciesNestQuantity")
	private Long parrotSpeciesNestQuantity;
	
	@Column(name = "parrotSpeciesDescription")
	private String parrotSpeciesDescription;

	@Column(name = "availabilityStatus")
	private Boolean availabilityStatus;
	
	@Column(name = "parrotSpeciesOrigin")
	private String parrotSpeciesOrigin;
	
	@Column(name = "parrotSpeciesAverageWeight")
	private Double parrotSpeciesAverageWeight;
	
	@Column(name = "parrotAverageRating")
	private Double parrotAverageRating;
	
	@Column(name = "nestAverageRating")
	private Double nestAverageRating;
	

	
@OneToMany(mappedBy = "parrotSpecies")
private List<ParrotSpeciesColorEntity> parrotSpeciesColors = new ArrayList<>();

@OneToMany(mappedBy = "parrotSpecies")
private List<FeedbackEntity> feedbacks = new ArrayList<>();
	
}
