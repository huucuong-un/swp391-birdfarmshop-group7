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
@Table(name = "nest_development")
public class NestDevelopmentEntity extends BaseEntity{

    @ManyToOne
    @JoinColumn(name = "nest_usage_history_id")
    private NestUsageHistoryEntity nestUsageHistory;


    @Column(name = "status")
    private String status;

    @Column(name = "event_date")
    private Date eventDate;

    @Column(name = "description")
    private String description;




}
