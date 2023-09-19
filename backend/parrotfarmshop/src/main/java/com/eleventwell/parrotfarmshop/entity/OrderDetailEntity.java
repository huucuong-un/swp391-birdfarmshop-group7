package com.eleventwell.parrotfarmshop.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

//*OrderID
//#ServiceID
//#ParrotID
//#ParrotEggNestID
@ToString
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
@Table(name = "OrderDetail")
public class OrderDetailEntity extends BaseEntity {


	
	

	

	
	@ManyToOne
    @JoinColumn(name = "orderID")
    private OrderEntity orders;
	
//	@ManyToOne
//    @JoinColumn(name = "serviceID")
//    private ServiceEntity service;
	
	
    
//
	
	 @OneToOne(cascade = CascadeType.ALL)
	    @JoinColumn(name = "parrotID", referencedColumnName = "id", unique = true)
	private ParrotEntity parrot;
	 
	 @OneToOne(cascade = CascadeType.ALL)
	    @JoinColumn(name = "parrotEggNestID", referencedColumnName = "id", unique = true)
	 private ParrotEggNestEntity parrotEggNest;
	
   
	
	@Column(name = "belongTo")
	private int belongTo;
	
	
	
	
}
