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

//parrotSpeciesID, colorID, parrotSpeciesDetailPrice, createdAt, createdBy,
//parrotSpeciesDetailImageUrl
@Entity
@Table(name = "parrotSpeciesColor")
public class ParrotSpeciesColorEntity extends BaseEntity {

    @Column(name = "parrotSpeciesDetailPrice")
    private Long parrotSpeciesColorPrice;

    @Column(name = "parrotSpeciesDetailImageUrl")
    private String parrotSpeciesColorImageUrl;

    @Column(name = "color")
    private String color;

    
    @ManyToOne
    @JoinColumn(name = "parrotSpeciesID")
    private ParrotSpeciesEntity parrotSpecies;


   
    
//	@OneToMany(mappedBy = "user")
//	private List<ParrotEntity> parrots = new ArrayList<>();
    @OneToMany(mappedBy = "parrotSpeciesColor")
    private List<ParrotEntity> parrots = new ArrayList<>();

}
