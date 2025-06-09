package com.broker.service;

import com.broker.domain.Accommodation;
import com.broker.domain.AccommodationRepository;

import com.broker.domain.Ticket;
import com.broker.domain.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class DbSyncService {
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private AccommodationRepository accomodationRepository;
    private static LocalDateTime lastSyncTickets;
    private static LocalDateTime lastSyncAccom;

    public static LocalDateTime getLastSyncTickets() {
        return lastSyncTickets;
    }

    public static LocalDateTime getLastSyncAccom() {
        return lastSyncAccom;
    }
    @Scheduled(fixedRate = 600000)
    public void syncTicketsFromSupplier(){
        //TODO: this needs to be an actual endpoint
        String url = "http://localhost:8082/tickets";
        ResponseEntity<CollectionModel<EntityModel<Ticket>>> response = restTemplate.exchange(url, HttpMethod.GET,null,
                new ParameterizedTypeReference<CollectionModel<EntityModel<Ticket>>>() {} );

        var collection = response.getBody();
        List<Ticket> tickets =  collection.getContent().stream()
                .map(EntityModel::getContent)
                .toList();
        //get the tickets -> if new then insert into repo
        // if not new then the only probable characteristic that changed is the stock info so update that

        for(Ticket ticket: tickets){
            Optional<Ticket> t = ticketRepository.findById(ticket.getId());
            if(t.isPresent()){
                Ticket existing = t.get();
                existing.setStock(ticket.getStock());
                ticketRepository.save(existing);
            }
            else{
                ticketRepository.save(ticket);
            }
        }
        lastSyncTickets = LocalDateTime.now();
        System.out.println("Synced from ticket supplier");
    }
    @Scheduled(fixedRate = 600000)
    public void syncAccomFromSupplier(){
        String url = "http://tubbybuddy.westeurope.cloudapp.azure.com:8080/accomms";
        ResponseEntity<CollectionModel<EntityModel<Accommodation>>> response = restTemplate.exchange(url, HttpMethod.GET,null,
                new ParameterizedTypeReference<CollectionModel<EntityModel<Accommodation>>>() {} );

        var collection = response.getBody();
        List<Accommodation> accoms =  collection.getContent().stream()
                .map(EntityModel::getContent)
                .toList();
        //get the tickets -> if new then insert into repo
        // if not new then the only probable characteristic that changed is the stock info so update that

        for(Accommodation accom: accoms){
            Optional<Accommodation> a = accomodationRepository.findById(accom.getId());
            if(a.isPresent()){
                Accommodation existing = a.get();
                existing.setAvailability(accom.isAvailability());
                accomodationRepository.save(existing);
            }
            else{
                accomodationRepository.save(accom);
            }
        }
        lastSyncAccom = LocalDateTime.now();
        System.out.println("Synced from accom supplier");
    }

//TODO: what if the supplier is down? does the rest client block? Have a look into that as well!
    // you basically get the whole http response so you can have a look at the http response code and from there deduct if there is a problem or not i think?
}
