package com.eleventwell.parrotfarmshop.entity;

//*SettingID
//SettingName
//Description
//CreatedAt
//#CreatedBy

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

@Entity
@Table(name = "SystemSetting")
public class SystemSettingEntity extends BaseEntity {

	
	@Column(name = "settingName")
	private String settingName;
	
	@Column(name = "description")
	private String description;
	

	
}
