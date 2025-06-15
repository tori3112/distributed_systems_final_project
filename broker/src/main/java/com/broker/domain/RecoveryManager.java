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
    private TransactionRepository transactionRepository;
    @Autowired
    private TwopcService twopcService;


    @EventListener(ApplicationReadyEvent.class)
    public void recoverTransactions(){
        // find the prepared but no committed transactions
        List<Transaction> tx = transactionRepository.findByStatus("PREPARED");
        for(Transaction t: tx){
            Order o = new Order();
            o.setId(t.getId());
            o.setAccom_id(t.getAccom_id());
            o.setTicket_id(t.getTicket_id());
            o.setPackage_id(t.getPackage_id());
            o.setAddress(t.getAddress());
            o.setOrder_time(t.getOrder_time());
            o.setPaid(t.isPaid());
            if(twopcService.callCommitPhase(o)){
                t.setStatus("COMMITTED");
                t.setLastUpdated(LocalDateTime.now());
                transactionRepository.save(t);
                System.out.println("Pending transaction "+t.getId()+" is complete");

            }
            else{
                twopcService.callRollback(o);
                t.setStatus("ABORTED");
                t.setLastUpdated(LocalDateTime.now());
                transactionRepository.save(t);
                System.out.println("Pending transaction "+t.getId()+" could not be completed");
            }
        }
       // contact the supplier to commit them
       // change the transaction log state
       // if not responding then change the transaction log to aborted

    }


}



