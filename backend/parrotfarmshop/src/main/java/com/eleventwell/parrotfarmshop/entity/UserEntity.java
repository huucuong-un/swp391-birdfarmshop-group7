package com.eleventwell.parrotfarmshop.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;


import jakarta.persistence.*;


import java.util.ArrayList;
import java.util.List;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
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

//userName is user account name
//fullName is name of user
@Entity
@Table(name = "user", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "user_name"
        }),
        @UniqueConstraint(columnNames = {
                "email"
        })
})
public class UserEntity extends BaseEntity {
    @NotBlank
    @Size(min = 3, max = 50)
    @Column(name = "user_name")
    private String userName;

    @NotBlank
    @Size(min = 6, max = 100)
    @JsonIgnore
    @Column
    private String password;

    @NotBlank
    @Email
    @Column(name = "email")
    private String email;

    @NotBlank
    @Size(min = 3, max = 50)
    @Column(name = "full_name")
    private String fullName;

    @Column
    private Boolean status;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private RoleEntity role;





 //====================================================================================
    @OneToMany(mappedBy = "user")
    private List<OrderEntity> order = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<DeliveryInformationEntity> deliveryInformations = new ArrayList<>();


    @OneToMany(mappedBy = "owner")
    private List<ParrotEntity> parrots = new ArrayList<>();

//======================================================================================




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
}
