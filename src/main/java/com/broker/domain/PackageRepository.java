package com.broker.domain;


import javax.annotation.PostConstruct;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import java.util.*;


@Repository
public interface PackageRepository extends JpaRepository<Package,Integer> {

   // private static final Map<Integer, Package> packages = new HashMap<>();

//    @PostConstruct
//    public void initData(){
//        Package p = new Package();
//        p.setId("p1");
//        p.setTicket("abba");
//        p.setAccomodation("house");
//        p.setName("fun pack");
//        p.setPrice(99.99f);
//        p.setAvailability(10);
//
//        packages.put(p.getId(),p);
//
//        Package b = new Package();
//        b.setId("p2");
//        b.setTicket("justinbiber");
//        b.setAccomodation("hotelroom");
//        b.setName("notfun");
//        b.setPrice(500.0f);
//        b.setAvailability(15);
//        packages.put(b.getId(),b);
//
//        Package c = new Package();
//        c.setId("p3");
//        c.setTicket("K3");
//        c.setAccomodation("seaside");
//        c.setName("classicPack");
//        c.setPrice(150.0f);
//        c.setAvailability(10);
//        packages.put(c.getId(),c);
//    }
//
//    public Collection<Package> getAllPackages(){
//        return packages.values();
//    }
//    public Optional<Package> findPackage(Integer id){
//        Assert.notNull(id,"Package id must be non null!");
//        Package p = packages.get(id);
//        return Optional.ofNullable(p);
//    }
}




