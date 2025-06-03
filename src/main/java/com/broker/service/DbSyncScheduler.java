package com.broker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;

public class DbSyncScheduler {
    @Autowired
    private DbSyncService dbSyncService;


    public void autoSyncTickets() {
        dbSyncService.syncTicketsFromSupplier();
        System.out.println("Syncd tickets from supplier");
        dbSyncService.syncAccomFromSupplier();
        System.out.println("Syncd accoms from supplier");
    }


}
