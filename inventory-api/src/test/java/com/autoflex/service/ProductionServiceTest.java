package com.autoflex.service;

import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

@QuarkusTest
public class ProductionServiceTest {

    @Inject
    ProductionService productionService;

    @Test
    public void testProductionCalculationSafety() {
        // Garante que o serviço responde mesmo se a lista estiver vazia
        var suggestions = productionService.calculateProduction();
        assertNotNull(suggestions, "A lista de sugestões não deve ser nula");
    }
}