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
	@Column(name = "promotionName")
	private String promotionName;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "value")
	private Double value;
	
	@Column(name = "startDate")
	private String startDate;
	
	@Column(name = "endDate")
	private String endDate;
	
	@Column(name = "status")
	private Boolean status;
	

	@OneToMany(mappedBy = "promotion")
	private List<OrderEntity> orders = new ArrayList<>();
	
}
