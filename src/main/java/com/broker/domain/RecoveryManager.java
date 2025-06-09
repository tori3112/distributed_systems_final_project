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
    private TransactionLogRepository transactionLogRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private TwopcService twopcService;


    @EventListener(ApplicationReadyEvent.class)
    public void recoverTransactions(){
        // find the prepared but no committed transactions
        List<TransactionLog> tx = transactionLogRepository.findByStatus("PREPARED");
        for(TransactionLog t: tx){
            Order o = orderRepository.findById(t.getTransactionId()).get();
            if(twopcService.callCommitPhase(o)){
                orderRepository.save(o);
                t.setStatus("COMMITTED");
                t.setLastUpdated(LocalDateTime.now());
                transactionLogRepository.save(t);
                System.out.println("Pending transaction "+t.getTransactionId()+" is complete");
                //now it will prob be waiting forever? maybe add a timeout
                // or will it timeout on its own so based on the http answer we get it will automatically not succeed
            }
            else{
                twopcService.callRollback(o);
                t.setStatus("ABORTED");
                t.setLastUpdated(LocalDateTime.now());
                transactionLogRepository.save(t);
                System.out.println("Pending transaction "+t.getTransactionId()+" could not be completed");
            }
        }
       // contact the supplier to commit them -> I need the order info as well
       // change the transaction log state
       // if not responding then change the transaction log to aborted

    }


}



