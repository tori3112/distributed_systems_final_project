package com.broker.domain;

import com.broker.service.TwopcService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class RecoveryManager {


    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private TwopcService twopcService;


    @EventListener(ApplicationReadyEvent.class)
    public void recoverTransactions(){
        // find the prepared but no committed transactions
        List<Order> tx = orderRepository.findByStatus("PREPARED");
        for(Order t: tx){
            if(twopcService.callCommitPhase(t)){
                t.setStatus("COMMITTED");
                t.setLastUpdated(LocalDateTime.now());
                orderRepository.save(t);
                System.out.println("Pending transaction "+t.getId()+" is complete");

            }
            else{
                twopcService.callRollback(t);
                t.setStatus("ABORTED");
                t.setLastUpdated(LocalDateTime.now());
                orderRepository.save(t);
                System.out.println("Pending transaction "+t.getId()+" could not be completed");
            }
        }
       // contact the supplier to commit them -> I need the order info as well
       // change the transaction log state
       // if not responding then change the transaction log to aborted

    }


}



