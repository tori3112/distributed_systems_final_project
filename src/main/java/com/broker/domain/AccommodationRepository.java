package com.broker.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;


@Repository
public interface AccommodationRepository extends JpaRepository<Accommodation,Integer> {

//    private static final Map<Integer, Accomodation> accom = new HashMap<>();
//
//    @PostConstruct
//    public void initData(){
//         Accomodation a = new Accomodation();
//         a.setId(2);
//         a.setAddress("Vinohradska 123");
//         a.setImageSrc("http://localhost/imagerc.jpg");
//         a.setImageAlt("an image");
//         a.setPrice(35.0f);
//         a.setLocation("Prague,Czechia");
//         a.setReviewCount(34);
//         a.setRating(3.3f);
//         a.setOffer(new ArrayList<String>(){
//             {add("Lock on bedroom door");
//                 add("Wifi");
//                 add("Luggage dropoff allowed");}
//         });
//         accom.put(a.getId(),a);
//    }
//
//    public Collection<Accomodation> getAllAccom(){
//            return accom.values();
//    }
//    public Optional<Accomodation> findAccom(int id){
//        Accomodation a = accom.get(id);
//        return Optional.ofNullable(a);
//    }
}


