package com.eleventwell.parrotfarmshop.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

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
	
	
	
	
	
	@OneToMany(mappedBy = "orderId")
	private List<OrderDetailEntity> orderDetails = new ArrayList<>();
	
	@ManyToOne
    @JoinColumn(name = "userID")
    private UserEntity user;


	@Column(name = "address")
	private String address;
	@Column(name="status")
	private Boolean status;

	@Column(name="total_price")
	private Double totalPrice;

	@Column(name="quantity")
	private int quantity;
	
	@ManyToOne
    @JoinColumn(name = "promotionID",nullable = true)
    private PromotionEntity promotion;
	
	
	


}
