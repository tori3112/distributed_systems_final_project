package com.broker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;

public class DbSyncScheduler {
    @Autowired
    private DbSyncService dbSyncService;

    @Scheduled(fixedRate = 60000) //TODO: change this tomorrow, i have no braincells to do so now
    public void autoSyncTickets() {
        dbSyncService.syncTicketsFromSupplier();
        dbSyncService.syncAccomFromSupplier();
    }


}
