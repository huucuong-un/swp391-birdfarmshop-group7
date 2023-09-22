package com.eleventwell.parrotfarmshop.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
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


	@NotBlank
	@Size(max=100)
	@Column(name = "SliderName")
	private String SliderName;

	@NotBlank
	@Lob
	@Column(name = "SliderImageURL")
	private String SliderImageURL;
	
	
 

}