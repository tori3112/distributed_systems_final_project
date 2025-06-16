# Broker Service

This directory contains the source code for the **Broker** back-end. It manages composite orders and coordinates with external supplier services.

## Overview

The Broker acts as an aggregator, allowing to select and order packaged products or services that consist of items from multiple independent suppliers. It is responsible for initiating and coordinating distributed transactions to ensure that composite orders are processed atomically (all-or-nothing).

The broker application is built using **Spring Boot**, which accelerates the development of enterprise-grade applications. It exposes a **REST API** for interaction with the frontend and internal logic.

## REST API Endpoints

- `GET /`: Retrieves a list of all predefined packages.
- `GET /tickets`: Retrieves a list of all tickets.
- `GET /tickets/{id}`: Retrieves ticket by id.
- `GET /tickets/{date}/accoms`: Retrieves a list of accommodations available for a specific date.
- `GET /accoms`: Retrieves a list of all accommodations.
- `GET /accoms/{id}`: Retrieves accommodation by id.
- `POST /get/order`: Submits a new composite order. This endpoint initiates the distributed transaction process with the relevant supplier services.
