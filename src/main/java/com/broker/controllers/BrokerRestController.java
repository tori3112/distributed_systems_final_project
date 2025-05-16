package com.broker.controllers;
import com.broker.domain.Package;
import com.broker.domain.PackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
public class BrokerRestController{

    private final PackageRepository packagerepo;

    @Autowired
    public BrokerRestController(PackageRepository packagerepo) {
        this.packagerepo = packagerepo;
    }
    @GetMapping("/all")
    CollectionModel<EntityModel<Package>> getPackages() {
        Collection<Package> packages = packagerepo.getAllPackages();

        List<EntityModel<Package>> mealEntityModels = new ArrayList<>();
        for (Package m : packages) {
            EntityModel<Package> em = mealToEntityModel(m.getId(), m);
            mealEntityModels.add(em);
        }
        return CollectionModel.of(mealEntityModels,
                linkTo(methodOn(MealsRestController.class).getMeals()).withSelfRel());
    }
    private EntityModel<Package> packageToEntityModel(String id, Meal meal) {
        return EntityModel.of(meal,
                linkTo(methodOn(MealsRestController.class).getMealById(id)).withSelfRel(),
                linkTo(methodOn(MealsRestController.class).getMeals()).withRel("rest/meals"));
    }
}