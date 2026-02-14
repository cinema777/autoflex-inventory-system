package com.autoflex.resources;

import com.autoflex.domain.RawMaterial;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/materials")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RawMaterialResource {

    @GET
    public List<RawMaterial> listAll() {
        // Busca todos os materiais cadastrados no banco
        return RawMaterial.listAll();
    }

    @POST
    @Transactional
    public Response create(RawMaterial material) {
        material.persist();
        return Response.status(Response.Status.CREATED).entity(material).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        RawMaterial.deleteById(id);
        return Response.noContent().build();
    }
}