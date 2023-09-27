package com.eleventwell.parrotfarmshop.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
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

@Table(name = "delivery_information")
public class DeliveryInformationEntity extends BaseEntity {

	@NotBlank
	@Column(name = "name")
	private String name;
	
	@NotBlank
	@Column(name = "phone_number")
	private String phoneNumber;

	@NotBlank
	@Column(name = "address")
	private String address;
	

	@ManyToOne
    @JoinColumn(name = "userID")
    private UserEntity user;

	@Column(name = "status")
	private Boolean status;

}
