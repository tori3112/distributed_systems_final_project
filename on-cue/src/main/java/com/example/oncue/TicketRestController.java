package com.example.oncue;

import com.example.oncue.domain.*;
import com.example.oncue.exceptions.OutOfStockException;
import com.example.oncue.exceptions.TicketNotFoundException;
import com.fasterxml.jackson.datatype.jsr310.deser.key.LocalDateTimeKeyDeserializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
public class TicketRestController {

    private final TicketRepository ticketRepository;
    private final TicketOrderRepository ticketOrderRepository;

    @Autowired
    TicketRestController(TicketRepository ticketRepository, TicketOrderRepository ticketOrderRepository) {
        this.ticketRepository = ticketRepository;
        this.ticketOrderRepository = ticketOrderRepository;
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

    @PostMapping("/prepare_ticket")
    public ResponseEntity<String> prepareTicket(@RequestBody Order order) {
        try {
            // Step 1: 创建 TicketOrder 并填充
            TicketOrder ticketOrder = new TicketOrder();
            ticketOrder.setTicketId(order.getTicket_id());
            ticketOrder.setOrderId(order.getId());
            ticketOrder.setQuantity(order.getAmount());

            // Step 2: 查询当前正在准备的总票数
            Integer quantityBeingPrepared = ticketOrderRepository.totalQuantityBeingPrepared(order.getTicket_id());

            // Step 3: 获取 Ticket 实体
            Optional<Ticket> optionalTicket = ticketRepository.findById(order.getTicket_id());
            if (optionalTicket.isEmpty()) {
                throw new TicketNotFoundException(order.getTicket_id());
            }

            Ticket ticket = optionalTicket.get();

            // Step 4: 判断是否还够票
            int remainingStock = ticket.getStock() - quantityBeingPrepared - order.getAmount();
            if (remainingStock < 0) {
                throw new OutOfStockException(ticket.getTitle());
            }

            // Step 5: 设置状态为 PREPARING 并保存
            ticketOrder.setPreparationStatus("PREPARING");
            ticketOrderRepository.save(ticketOrder);

            return ResponseEntity.ok("Ticket order prepared successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during ticket preparation.");
        }
    }

    @PostMapping("/commit_ticket")
    public ResponseEntity<String> commitTicket(@RequestBody Order order) {
        Optional<TicketOrder> ticketOrderOpt = ticketOrderRepository.findByOrderId(order.getId());
        Optional<Ticket> ticketOpt = ticketRepository.findById(order.getTicket_id());

        if (ticketOrderOpt.isEmpty() || ticketOpt.isEmpty()) {
            throw new TicketNotFoundException(order.getTicket_id());
        }

        TicketOrder ticketOrder = ticketOrderOpt.get();
        Ticket ticket = ticketOpt.get();

        if (ticketOrder.getPreparationStatus().equalsIgnoreCase("PREPARING")) {
            // 减去库存
            int newStock = ticket.getStock() - ticketOrder.getQuantity();
            ticket.setStock(newStock);

            ticketOrder.setPreparationStatus("COMMIT");
            ticketOrderRepository.save(ticketOrder);
            ticketRepository.save(ticket);

            return ResponseEntity.ok("Ticket order committed successfully.");
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ticket order cannot be committed.");
    }

    @PostMapping("/rollback_ticket")
    public ResponseEntity<String> rollbackTicket(@RequestBody Order order) {
        Optional<TicketOrder> ticketOrderOpt = ticketOrderRepository.findByOrderId(order.getId());
        Optional<Ticket> ticketOpt = ticketRepository.findById(order.getTicket_id());

        if (ticketOrderOpt.isEmpty() || ticketOpt.isEmpty()) {
            throw new TicketNotFoundException(order.getTicket_id());
        }

        TicketOrder ticketOrder = ticketOrderOpt.get();
        Ticket ticket = ticketOpt.get();

        String currentStatus = ticketOrder.getPreparationStatus();

        // 回滚前状态检查
        if ("ROLLBACK".equalsIgnoreCase(currentStatus)) {
            return ResponseEntity.ok("Ticket order was already rolled back.");
        }

        // 如果订单是 COMMIT 状态，需要恢复库存
        if ("COMMIT".equalsIgnoreCase(currentStatus)) {
            int restoredStock = ticket.getStock() + ticketOrder.getQuantity();
            ticket.setStock(restoredStock);
            ticketRepository.save(ticket);
        }

        // 更新状态为 ROLLBACK
        ticketOrder.setPreparationStatus("ROLLBACK");
        ticketOrderRepository.save(ticketOrder);

        return ResponseEntity.ok("Ticket order rolled back successfully.");
    }



}
//linkTo(methodOn(MealsRestController.class).getMeals()).withRel("rest/meals"));