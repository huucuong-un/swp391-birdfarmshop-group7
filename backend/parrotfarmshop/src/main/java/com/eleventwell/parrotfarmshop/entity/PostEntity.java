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


//*PostID
//PostTitle
//PostContent
//PostImg
//StartDate
//EndDate
//CreatedAt
//#CreatedBy

@ToString
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
@Table(name = "Post")
public class PostEntity extends BaseEntity {


	@NotBlank
	@Column(name = "postTitle")
	private String postTitle;

	@NotBlank
	@Column(name = "postContent")
	private String postContent;

	@NotBlank
	@Lob
	@Column(name = "postImageURL")
	private String postImageURL;
	
	@Column(name = "startDate")
	private String startDate;
	
	@Column(name = "endDate")
	private String endDate;
	
	@Column(name = "status")
	private Boolean status;
	

	
	
}
