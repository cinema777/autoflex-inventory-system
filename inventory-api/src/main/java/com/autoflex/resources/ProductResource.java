package com.autoflex.resources;

import com.autoflex.domain.Product;
import com.autoflex.domain.ProductMaterial;
import com.autoflex.domain.RawMaterial;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductResource {

    @GET
    public List<Product> listAll() {
        return Product.listAll();
    }

    @POST
    @Transactional
    public Response create(Product product) {
        product.persist();
        return Response.status(Response.Status.CREATED).entity(product).build();
    }

    @POST
    @Path("/{productId}/materials/{materialId}")
    @Transactional
    public Response addMaterial(@PathParam("productId") Long productId, 
                                @PathParam("materialId") Long materialId, 
                                @QueryParam("requiredQuantity") Double qty) {
        
        Product product = Product.findById(productId);
        RawMaterial material = RawMaterial.findById(materialId);
        
        if (product == null || material == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        ProductMaterial association = new ProductMaterial();
        association.product = product;
        association.material = material;
        association.requiredQuantity = qty;
        association.persist();

        return Response.status(Response.Status.CREATED).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        Product.deleteById(id);
        return Response.noContent().build();
    }

}
