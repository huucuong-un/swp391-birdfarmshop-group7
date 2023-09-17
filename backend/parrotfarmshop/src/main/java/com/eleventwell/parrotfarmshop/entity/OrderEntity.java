package com.eleventwell.parrotfarmshop.entity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

@Entity
@Table(name = "orders")
public class OrderEntity extends BaseEntity {
	
	
	
	
	
	@OneToMany(mappedBy = "orders")
	private List<OrderDetailEntity> orderDetails = new ArrayList<>();
	
	@ManyToOne
    @JoinColumn(name = "userID")
    private UserEntity user;
	
	@Column(name = "address")
	private String address;
	
	@ManyToOne
    @JoinColumn(name = "promotionID")
    private PromotionEntity promotion;
	
	
	


}
