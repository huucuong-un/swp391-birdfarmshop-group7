package com.eleventwell.parrotfarmshop.entity;
import com.eleventwell.parrotfarmshop.converter.DateConverter;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jdk.jfr.Unsigned;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

//*PromotionID
//PromotionName
//Description
//Value
//CreatedAt
//StartDate
//EndDate
//Status
//#CreatedBy
@ToString
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
@Table(name = "Promotion")
public class PromotionEntity extends BaseEntity {


	@NotBlank
	@Size(max=30)
	@Column(name = "code")
	private String code;

	@NotBlank
	@Column(name = "description")
	private String description;

	@Unsigned
	@Column(name = "value")
	private Double value;


	@Temporal(TemporalType.DATE) // Specify that only the date part should be stored
	// Specify that only the date part should be stored
	@Column(name = "start_date")
	@Convert(converter = DateConverter.class) // Use a custom converter
	private Date startDate;


	@Temporal(TemporalType.DATE) // Specify that only the date part should be stored
	@Column(name = "end_date")
	@Convert(converter = DateConverter.class) // Use a custom converter
	private Date endDate;
	
	@Column(name = "status")
	private Boolean status;
	

	@OneToMany(mappedBy = "promotion")
	private List<OrderEntity> orders = new ArrayList<>();

	@Column(name="quanity")
	private int quantity;
	
}
