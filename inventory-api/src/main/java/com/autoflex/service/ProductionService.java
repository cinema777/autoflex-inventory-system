package com.autoflex.service;

import com.autoflex.domain.*;
import com.autoflex.dto.ProductionSuggestionDTO;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.*;

@ApplicationScoped
public class ProductionService {

    public List<ProductionSuggestionDTO> calculateProduction() {
        // Busca produtos priorizando o lucro (maior preço primeiro)
        List<Product> products = Product.list("order by price desc");
        List<ProductionSuggestionDTO> suggestions = new ArrayList<>();

        // Criamos uma cópia do estoque em memória (virtual)
        Map<Long, Double> virtualStock = new HashMap<>();
        List<RawMaterial> materials = RawMaterial.listAll();
        for (RawMaterial m : materials) {
            virtualStock.put(m.id, m.stockQuantity != null ? m.stockQuantity : 0.0);
        }

        for (Product p : products) {
            if (p.productMaterials == null || p.productMaterials.isEmpty()) continue;

            int maxPossible = Integer.MAX_VALUE;

            // Verifica quanto podemos produzir com o que sobrou no estoque virtual
            for (ProductMaterial pm : p.productMaterials) {
                double currentStock = virtualStock.get(pm.material.id);
                if (pm.requiredQuantity > 0) {
                    int possible = (int) (currentStock / pm.requiredQuantity);
                    if (possible < maxPossible) maxPossible = possible;
                } else {
                    maxPossible = 0;
                }
            }

            // Se puder produzir, "gastamos" o estoque virtual para o próximo produto da lista
            if (maxPossible > 0 && maxPossible != Integer.MAX_VALUE) {
                for (ProductMaterial pm : p.productMaterials) {
                    double used = maxPossible * pm.requiredQuantity;
                    virtualStock.put(pm.material.id, virtualStock.get(pm.material.id) - used);
                }
                suggestions.add(new ProductionSuggestionDTO(p.name, maxPossible, maxPossible * p.price));
            }
        }
        return suggestions;
    }
}