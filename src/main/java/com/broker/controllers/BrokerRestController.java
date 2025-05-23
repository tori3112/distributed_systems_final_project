package com.broker.controllers;
import com.broker.domain.Package;
import com.broker.domain.PackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
public class BrokerRestController{

    private final PackageRepository packagerepo;

    @Autowired
    public BrokerRestController(PackageRepository packagerepo) {
        this.packagerepo = packagerepo;
    }
    @GetMapping("/")
    CollectionModel<EntityModel<Package>> getPackages() throws Exception {
        Collection<Package> packages = packagerepo.getAllPackages();

        List<EntityModel<Package>> packageEntityModels = new ArrayList<>();
        for (Package m : packages) {
            EntityModel<Package> em = packageToEntityModel(m.getId(), m);
            packageEntityModels.add(em);
        }
        return CollectionModel.of(packageEntityModels,
                linkTo(methodOn(BrokerRestController.class).getPackages()).withSelfRel());
    }

    @GetMapping("/{id}")
    public EntityModel<Package> getPackageById(@PathVariable String id) throws Exception {
        Package  pack = packagerepo.findPackage(id).orElseThrow(()->new Exception("Package with id "+id+" not found"));

        return packageToEntityModel(id, pack);
    }
    private EntityModel<Package> packageToEntityModel(String id, Package pack ) throws Exception {
        return EntityModel.of(pack,
                linkTo(methodOn(BrokerRestController.class).getPackageById(id)).withSelfRel(),
                linkTo(methodOn(BrokerRestController.class).getPackages()).withRel("/"));
    }

}