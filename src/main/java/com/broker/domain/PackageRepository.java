package com.broker.domain;


import javax.annotation.PostConstruct;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import java.util.*;


@Component
public class PackageRepository {

    private static final Map<String, Package> packages = new HashMap<>();

    @PostConstruct
    public void initData(){
        Package p = new Package();
        p.setId("p1");
        p.setArtistId("abba");
        p.setAccomodId("house");
        p.setName("fun pack");
        p.setPrice(99.99f);
        p.setStock(10);

        packages.put(p.getId(),p);

        Package b = new Package();
        b.setId("p2");
        b.setArtistId("justinbiber");
        b.setAccomodId("hotelroom");
        b.setName("notfun");
        b.setPrice(500.0f);
        b.setStock(15);
        packages.put(b.getId(),b);

        Package c = new Package();
        c.setId("p3");
        c.setArtistId("K3");
        c.setAccomodId("seaside");
        c.setName("classicPack");
        c.setPrice(150.0f);
        c.setStock(10);
        packages.put(c.getId(),c);
    }

    public Collection<Package> getAllPackages(){
        return packages.values();
    }
    public Optional<Package> findPackage(String id){
        Assert.notNull(id,"Package id must be non null!");
        Package p = packages.get(id);
        return Optional.ofNullable(p);
    }
}




