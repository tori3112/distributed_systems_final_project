package com.example.testcoordinator;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class TestController {
    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/initiate_2pc")
    private boolean callPreparePhase(Order order) {
        try {
            boolean isAccommSuccess = callServices("http://localhost:8080/prepare_order", order);

            return isAccommSuccess; 
        } catch (Exception e) {
            return false;
        }
    }
    
    
    private boolean callServices(String url, Order order) {
        ResponseEntity<String> response = restTemplate.postForEntity(url, order, String.class);
        return response.getStatusCode().is2xxSuccessful();
    }
}
