package com.autoflex.dto;

public class ProductionSuggestionDTO {
    public String productName;
    public Integer quantityToProduce;
    public Double totalPrice;

    public ProductionSuggestionDTO(String name, Integer qty, Double price) {
        this.productName = name;
        this.quantityToProduce = qty;
        this.totalPrice = price * qty;
    }
}