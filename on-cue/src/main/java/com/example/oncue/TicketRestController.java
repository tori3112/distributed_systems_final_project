package com.example.oncue;

import com.example.oncue.domain.Ticket;
import com.example.oncue.domain.TicketType;
import com.example.oncue.domain.TicketRepository;
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
    public TicketRestController(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    @GetMapping("/tickets/{id}")
    EntityModel<Ticket> getTicketById(@PathVariable String id) {
        //TODO: use execptions for this
        Optional<Ticket> ticket = ticketRepository.findTicket(id);
        if (ticket.isPresent()) {
            return EntityModel.of(ticket.get());
        } else {
            return null;
        }
    }


}
