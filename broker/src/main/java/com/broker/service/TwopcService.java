package com.broker.service;

import com.broker.domain.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
@Service
public class TwopcService {
    @Autowired
    private RestTemplate restTemplate;

    public void callRollback(Order order) {
        callServiceRollbackPhase("https://tubbybud.japaneast.cloudapp.azure.com:8443/rollback_ticket", order);
        callServiceRollbackPhase("https://tubbybuddy.westeurope.cloudapp.azure.com:8443/rollback_accomm", order);
    }

    public void callServiceRollbackPhase(String url, Order order) {
        restTemplate.postForEntity(url, order, Void.class);
    }

    public boolean callCommitPhase(Order order) {
        boolean isTicketSuccess = callServices("https://tubbybud.japaneast.cloudapp.azure.com:8443/commit_ticket", order);
        boolean isAccomSuccess = callServices("https://tubbybuddy.westeurope.cloudapp.azure.com:8443/commit_accomm", order);

        return isTicketSuccess && isAccomSuccess;
    }

    public boolean callPreparePhase(Order order) {
        try {
            boolean isTicketSuccess = callServices("https://tubbybud.japaneast.cloudapp.azure.com:8443/prepare_ticket", order);
            boolean isAccomSuccess = callServices("https://tubbybuddy.westeurope.cloudapp.azure.com:8443/prepare_accomm", order);

            return isTicketSuccess && isAccomSuccess;
        } catch (Exception e) {

            return false;
        }
    }

    public boolean callServices(String url, Order order) {
        ResponseEntity<String> response = restTemplate.postForEntity(url, order, String.class);
        return response.getStatusCode().is2xxSuccessful();
    }




}
