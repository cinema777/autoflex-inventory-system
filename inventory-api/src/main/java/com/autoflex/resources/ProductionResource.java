package com.autoflex.resources;

import com.autoflex.service.ProductionService;
import com.autoflex.dto.ProductionSuggestionDTO;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import java.util.List;

@Path("/production-suggestion")
public class ProductionResource {

    @Inject
    ProductionService service;

    @GET
    public List<ProductionSuggestionDTO> getSuggestion() {
        return service.calculateProduction();
    }
}