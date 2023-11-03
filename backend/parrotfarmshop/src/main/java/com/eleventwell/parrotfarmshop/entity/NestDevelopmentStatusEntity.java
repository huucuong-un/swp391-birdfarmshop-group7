package com.eleventwell.parrotfarmshop.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@ToString
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
@Table(name = "nest_development_status")
public class NestDevelopmentStatusEntity extends BaseEntity{

    @OneToMany(mappedBy = "nestDevelopmentStatus")
    private List<NestDevelopmentEntity> nestDevelopmentEntity;

    @Size(min = 3, max = 30)
    @Column(name = "name")
    private String name;

    @Size(min = 10, max = 150)
    @Column(name = "description")
    private String description;


    @Column(name = "available")
    private Boolean available;


    @Column(name = "sequence")
    private  Integer sequence;
}
