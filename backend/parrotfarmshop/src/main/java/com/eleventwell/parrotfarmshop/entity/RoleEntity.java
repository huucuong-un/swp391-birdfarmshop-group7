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

@ToString
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

//*RoleID
//Description
//CreatedAt
//Status

@Entity
@Table(name = "role")
public class RoleEntity extends BaseEntity {

	@Column(name ="roleName")
	private String roleName;
	
	@Column(name ="description")
	private String description;
	
	@OneToMany(mappedBy = "role")
    private List<UserEntity> users = new ArrayList<>();

	@Column(name ="status")
	private Boolean status;
}
