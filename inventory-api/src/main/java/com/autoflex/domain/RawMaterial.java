package com.autoflex.domain;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import java.util.List;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "raw_materials")
public class RawMaterial extends PanacheEntity {
    public String name;
    public Double stockQuantity;

    @OneToMany(mappedBy = "material", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("material")
    public List<ProductMaterial> productMaterials;
}
