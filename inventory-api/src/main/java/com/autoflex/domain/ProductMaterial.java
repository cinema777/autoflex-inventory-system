package com.autoflex.domain;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "product_materials")
public class ProductMaterial extends PanacheEntity {
    
    @ManyToOne
    @JsonIgnore
    public Product product;

    @ManyToOne
    @JsonIgnore
    public RawMaterial material;

    public Double requiredQuantity;
}