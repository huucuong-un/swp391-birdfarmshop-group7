package com.eleventwell.parrotfarmshop.entity;

//
//feedbackId, userID, feedbackContent, feedbackRating, parrotSpeciesID,createdAt, createdBy
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

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

@Entity
@Table(name = "feedback")
public class FeedbackEntity extends BaseEntity {

	
	@Column(name = "feedbackContent")
	private String feedbackContent;
	
	
	@Column(name = "feedbackRating")
	private int feedbackRating;
	
	@Column(name = "belongTo")
	private int belongTo;
	
	@ManyToOne
    @JoinColumn(name = "userID")
    private UserEntity user;
	
	@ManyToOne
    @JoinColumn(name = "parrotSpeciesID")
    private ParrotSpeciesEntity parrotSpecies;
	
	
	

	

	
}
