package com.broker.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TicketRepository extends JpaRepository<Ticket,Integer> {
    List<Ticket> findByTitle(String title);
//    private static final Map<Integer, Ticket> tickets = new HashMap<>();
//
//    @PostConstruct
//    public void initData(){
//        Ticket a = new Ticket();
//        a.setId(2);
//        a.setTitle("Rockin' Summer Nights");
//        a.setArtist("Wildfire Band");
//        a.setDate("Friday, July 21st");
//        a.setImage(null);
//        a.setVenue("Sunset Stage");
//        tickets.put(a.getId(),a);
//    }
//
//    public Collection<Ticket> getAllTickets(){
//        return tickets.values();
//    }
//    public Optional<Ticket> findTicket(int id){
//        Ticket t = tickets.get(id);
//        return Optional.ofNullable(t);
//    }
    
}


