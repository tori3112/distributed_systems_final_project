package com.test.realtestcoordinator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class TestController {

    private final RestTemplate restTemplate = new RestTemplate();
    private static final Logger log = LoggerFactory.getLogger(TestController.class);

    @PostMapping("/initiate_2pc")
    private boolean callPhase() {
        //init dummy data
        Order order = new Order();
        order.setId(1);
        order.setAddress("Melrose Avenue");
        order.setAccom_id(2);
        order.setPaid(false);
        order.setPackage_id(1);
        order.setTicket_id(3);
        try {

            log.info("success , bar low");

            boolean isAccommSuccess = callServices("http://localhost:8080/commit_accomm", order);
            return isAccommSuccess;
        } catch (Exception e) {
            return false;
        }
    }


    private boolean callServices(String url, Order order) {
        ResponseEntity<String> response = restTemplate.postForEntity(url, order, String.class);
        log.info("Response from {}: status={}, body={}", url, response.getStatusCode(), response.getBody());
        return response.getStatusCode().is2xxSuccessful();
    }
}
