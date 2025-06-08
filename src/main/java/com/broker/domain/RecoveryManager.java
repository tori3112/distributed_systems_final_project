package com.broker.domain;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class RecoveryManager {

    @Autowired
    private TransactionLogRepository transactionLogRepository;

    @EventListener(ApplicationReadyEvent.class)
    public void recoverTransactions(){
       // find the prepared but no committed transactions
       // contact the supplier to commit them -> I need the order info as well
       // change the transaction log state
       // if not responding then change the transaction log to aborted

    }


}



