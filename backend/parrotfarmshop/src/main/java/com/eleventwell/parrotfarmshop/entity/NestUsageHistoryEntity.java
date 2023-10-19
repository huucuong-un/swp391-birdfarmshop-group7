package com.eleventwell.parrotfarmshop.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@ToString
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
@Table(name = "nest_usage_history")
public class NestUsageHistoryEntity extends BaseEntity {


    @ManyToOne
    @JoinColumn(name = "parrot_couple_id")
    private ParrotCoupleEntity parrotCouple;

    @ManyToOne
    @JoinColumn(name = "nest_id")
    private NestEntity nest;

    @Column(name="start_date")
    private Date startDate;

    @Column(name="end_date")
    private Date endDate;

}
