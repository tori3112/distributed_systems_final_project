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
        callServiceRollbackPhase("http://localhost:8080/rollback_order", order);
        callServiceRollbackPhase("http://localhost:8081/rollback_order", order);
    }

    public void callServiceRollbackPhase(String url, Order order) {
        restTemplate.postForEntity(url, order, Void.class);
    }

    public boolean callCommitPhase(Order order) {
        boolean isTicketSuccess = callServices("http://localhost:8080/commit_order", order);
        boolean isAccomSuccess = callServices("http://localhost:8081/commit_order", order);

        return isTicketSuccess && isAccomSuccess;
    }

    public boolean callPreparePhase(Order order) {
        try {
            boolean isTicketSuccess = callServices("http://localhost:8080/prepare_order", order);
            boolean isAccomSuccess = callServices("http://localhost:8081/prepare_order", order);

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
