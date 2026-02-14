package com.autoflex.domain;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import java.util.List;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "product")
public class Product extends PanacheEntity {
    public String name;
    public Double price;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("product")
    public List<ProductMaterial> productMaterials;
}
