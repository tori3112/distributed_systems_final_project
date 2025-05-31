package com.broker.service;

import com.broker.domain.Accomodation;
import com.broker.domain.AccomodationRepository;
import com.broker.domain.Ticket;
import com.broker.domain.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DbSyncService {
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private AccomodationRepository accomodationRepository;
    private static LocalDateTime lastSyncTickets;
    private static LocalDateTime lastSyncAccom;

    public void syncTicketsFromSupplier(){
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
    }

    public void syncAccomFromSupplier(){
        String url = "http://localhost:8082/tickets"; // TODO: this needs to change
        ResponseEntity<CollectionModel<EntityModel<Accomodation>>> response = restTemplate.exchange(url, HttpMethod.GET,null,
                new ParameterizedTypeReference<CollectionModel<EntityModel<Accomodation>>>() {} );

        var collection = response.getBody();
        List<Accomodation> accoms =  collection.getContent().stream()
                .map(EntityModel::getContent)
                .toList();
        //get the tickets -> if new then insert into repo
        // if not new then the only probable characteristic that changed is the stock info so update that

        for(Accomodation accom: accoms){
            Optional<Accomodation> a = accomodationRepository.findById(accom.getId());
            if(a.isPresent()){
                Accomodation existing = a.get();
                // TODO: here we need to logic for availability
                accomodationRepository.save(existing);
            }
            else{
                accomodationRepository.save(accom);
            }
        }



    }


}
