# Distributed Systems: Service-Oriented Distributed Applications on a Cloud Platform

This project implements a service-oriented distributed web application, acting as a broker for two suppliers. It demonstrates key concepts of distributed systems, including transaction management, fault tolerance, and cloud deployment.

## Project Overview

The core of this project is a web shop that functions as a broker. It allows users to order packaged, composite products that combine offers from external suppliers. The system ensures atomic transactions across these distributed services and is designed with fault tolerance in mind.

## Implemented Features

This section details the features implemented, categorized by the project's requirement levels.

### Level 1: Basic Requirements

- [X] **Fully Functional Distributed Application:** A web shop serving as the front-end (GUI) and back-end (application logic and data storage) of the broker platform.
- [X] **External Supplier Services:** Two external supplier services developed, providing functionality to list, reserve, and order products/services.
- [X] **Fault Tolerance:** The broker platform is designed to be fault-tolerant, ensuring it does not crash if an external service is unresponsive or returns a malformed response.
- [X] **ACID Properties and Distributed Transaction:** Orders of composite products satisfy ACID properties and are implemented as a distributed transaction with the broker as the coordinator. The order succeeds only if all items are available and the customer provides a valid delivery address and payment information.
- [X] **Failure Scenario Demonstration:** The solution demonstrates functionality in a few failure scenarios while guaranteeing ACID properties.
- [X] **User Order Functionality:** Users can order without an account or authentication, providing delivery information at checkout. 
- [X] **Manager Order Overview:** Managers can authenticate and view a list of all customer orders.
- [X] **Multi-Domain Deployment:** The three administration domains (broker and two suppliers) are separated across three Azure accounts of three team members, simulating different companies.
- [X] **Spring Boot Implementation:** Both broker and supplier services are implemented using Spring Boot.

### Level 2: Advanced Requirements (e.g., good to very good score)

- [X] **Application-Level Access Control (Auth0 Integration):** The manager authenticates using Auth0, an external identity provider. Managers have a complete overview of orders. JWT tokens are used for authentication and authorization.
- [X] **Lightweight Hosting:** The application is deployed on lightweight compute services (Azure App Services).

### Bonus Level Requirements

- [X] **Single Page Application (SPA) Web Shop:** The web shop is implemented as a single-page application.

## Repository structure

- `broker/`: Contains the source code for the broker back-end logic.
- `accommodation supplier/`: Contains the source code for one of the external supplier services, specifically providing accommodation.
- `ticket supplier/`:Contains the source code for one of the external supplier services, specifically providing concert tickets.
- `frontend`: Contains the source code for the broker web application.