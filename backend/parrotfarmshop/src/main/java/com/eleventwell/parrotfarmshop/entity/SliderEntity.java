package com.eleventwell.parrotfarmshop.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
//*SliderID
//SliderName
//SliderImg
//CreatedAt
//#CreatedBy
@Entity
@Table(name = "Slider")
public class SliderEntity extends BaseEntity {
	@Column(name = "SliderName")
	private String SliderName;
	
	@Column(name = "SliderImageURL")
	private String SliderImageURL;
	
	
 

}