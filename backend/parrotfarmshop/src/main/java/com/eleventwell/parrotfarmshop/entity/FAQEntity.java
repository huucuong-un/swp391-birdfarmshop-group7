/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eleventwell.parrotfarmshop.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

/**
 *
 * @author Admin
 */
@ToString
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
@Table(name="FAQs")
public class FAQEntity extends BaseEntity {

    @NotBlank
    @Size(min = 3, max = 100)
    @Column(name = "title")
    private String title;

    @NotBlank
    @Size(min = 2, max = 200)
    @Column(name = "content")
    private String content;


    @Column(name = "status")
    private Boolean status;


}
