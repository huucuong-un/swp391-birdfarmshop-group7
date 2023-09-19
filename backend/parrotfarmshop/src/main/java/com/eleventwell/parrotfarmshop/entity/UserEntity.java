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


//*UserID
//UserName
//Password
//Email
//CreatedAt
//Status
@ToString
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
@Table(name = "user")
public class UserEntity extends BaseEntity {

	@Column(name = "username")
	private String userName;

	@Column
	private String password;

	@Column(name = "email")
	private String email;

	@Column(name = "fullname")
	private String fullName;
	
	@Column
	private Integer status;

	
//	@OneToMany(mappedBy = "user")
//	private List<ParrotEntity> parrots = new ArrayList<>();
	
//	
//	@OneToMany(mappedBy = "User")
//	private List<ParrotSpeciesEntity> parrotSpecies = new ArrayList<>();
//	
//	@OneToMany(mappedBy = "User")
//	private List<ParrotSpeciesDetailEntity> parrotSpeciesDetail = new ArrayList<>();
//	
//	@OneToMany(mappedBy = "User")
//	private List<ColorEntity> color = new ArrayList<>();

//	@OneToMany(mappedBy = "User")
//	private List<ParrotEggNestEntity> parrotEggNest = new ArrayList<>();
//	
	
//	
//	

	@OneToMany(mappedBy = "user")
	private List<OrderEntity> order = new ArrayList<>();
	
	@OneToMany(mappedBy = "user")
	private List<DeliveryInformationEntity> deliveryInformations = new ArrayList<>();
	
	
@OneToMany(mappedBy = "owner")
	private List<ParrotEntity> parrots = new ArrayList<>();

//	
	
	 @ManyToOne
	    @JoinColumn(name = "roleID")
	    private RoleEntity role;
	

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}


}
