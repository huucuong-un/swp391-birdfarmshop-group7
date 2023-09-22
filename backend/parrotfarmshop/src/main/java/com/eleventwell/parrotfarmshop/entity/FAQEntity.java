/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eleventwell.parrotfarmshop.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

/**
 *
 * @author Admin
 */
@Entity
@Table(name="FAQs")
public class FAQEntity extends BaseEntity {

    @NotBlank
    @Column(name = "FAQsTitle")
    private String FAQTitle;

    @NotBlank
    @Column(name = "FAQsContent")
    private String FAQContent;



}
