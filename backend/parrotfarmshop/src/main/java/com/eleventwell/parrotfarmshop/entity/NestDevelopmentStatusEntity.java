package com.eleventwell.parrotfarmshop.entity;

import jakarta.persistence.*;
import lombok.*;

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

    @OneToOne(mappedBy = "nestDevelopmentStatus")
    @PrimaryKeyJoinColumn
    private NestDevelopmentEntity nestDevelopmentEntity;

    @Column
    private String name;

    @Column
    private String description;

    @Column
    private  Integer sequence;
}
