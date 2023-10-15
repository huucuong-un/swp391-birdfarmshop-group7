package com.eleventwell.parrotfarmshop.dto;

import com.eleventwell.parrotfarmshop.entity.ParrotSpeciesEntity;
import com.eleventwell.parrotfarmshop.entity.UserEntity;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jdk.jfr.Unsigned;
import lombok.*;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FeedbackDTO extends BaseDTO {

    private String content;


    private Integer rating;


    private String belongTo;


    private Integer userId;

    private Integer colorId;

    private Long orderId;

}
