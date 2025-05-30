package com.example.oncue;

import com.example.oncue.domain.Ticket;
import com.example.oncue.domain.TicketRepository;
import com.example.oncue.exceptions.OutOfStockException;
import com.example.oncue.exceptions.TicketNotFoundException;
import com.fasterxml.jackson.datatype.jsr310.deser.key.LocalDateTimeKeyDeserializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
public class TicketRestController {

    private final TicketRepository ticketRepository;

    @Autowired
    TicketRestController(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    @GetMapping("/tickets/{id}")
    EntityModel<Ticket> getTicketById(@PathVariable Integer id) {
        Ticket ticket = ticketRepository.findById(id).orElseThrow(() -> new TicketNotFoundException(id));
//        return ticket.map(EntityModel::of).orElse(null);
        System.out.println("Fetched ticket: " + ticket);

        return ticketToEntityModel(id, ticket);
    }

    @GetMapping("/tickets")
    CollectionModel<EntityModel<Ticket>> getTickets() {
        Collection<Ticket> tickets = ticketRepository.findAll();

        List<EntityModel<Ticket>> ticketEntityModels = new ArrayList<>();
        for (Ticket t : tickets) {
            EntityModel<Ticket> tick = ticketToEntityModel(t.getId(), t);
            ticketEntityModels.add(tick);
        }
        return CollectionModel.of(ticketEntityModels,
                linkTo(methodOn(TicketRestController.class).getTickets()).withSelfRel());
    }

    @GetMapping("/tickets/in-stock/title/{title}")
    CollectionModel<EntityModel<Ticket>> getTicketsByTitle(@PathVariable String title) {
        List<Ticket> tickets = ticketRepository.findByTitle(title);

        List<EntityModel<Ticket>> ticketCollectionModel = new ArrayList<>();
        if (tickets.isEmpty()){
            throw new OutOfStockException(title);
        }

        for (Ticket t : tickets) {
            EntityModel<Ticket> tick = ticketToEntityModel(t.getId(), t);
            ticketCollectionModel.add(tick);
        }
        return CollectionModel.of(ticketCollectionModel,
                linkTo(methodOn(TicketRestController.class).getTickets()).withSelfRel());
    }

    @GetMapping("/tickets/in-stock/location/{location}")
    CollectionModel<EntityModel<Ticket>> getTicketsByLocation(@PathVariable String location) {
        List<Ticket> tickets = ticketRepository.findByLocation(location);

        List<EntityModel<Ticket>> ticketCollectionModel = new ArrayList<>();
        if (tickets.isEmpty()){
            throw new OutOfStockException(location);
        }

        for (Ticket t : tickets) {
            EntityModel<Ticket> tick = ticketToEntityModel(t.getId(), t);
            ticketCollectionModel.add(tick);
        }
        return CollectionModel.of(ticketCollectionModel,
                linkTo(methodOn(TicketRestController.class).getTickets()).withSelfRel());
    }


    //Make to entity methods
    private EntityModel<Ticket> ticketToEntityModel(Integer id, Ticket ticket) {
        return EntityModel.of(ticket,
                linkTo(methodOn(TicketRestController.class).getTicketById(id)).withSelfRel(),
                linkTo(methodOn(TicketRestController.class).getTickets()).withRel("/tickets"),
                linkTo(methodOn(TicketRestController.class).getTicketsByTitle(ticket.getTitle())).withRel("search-by-title"));
    }
}
//linkTo(methodOn(MealsRestController.class).getMeals()).withRel("rest/meals"));