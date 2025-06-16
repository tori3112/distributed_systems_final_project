# Ticket Supplier Service

This directory contains the source code for supplier service, specifically providing **tickets**. Similar to the Accommodation Supplier, this service operates as an independent company within the distributed web shop.

## Overview

The Ticket Supplier Service provides its product catalog and real-time stock availability through a defined REST API. It is responsible for managing ticket reservations and confirming orders. It maintains its own data and operates within a separate administrative domain, emphasizing the distributed nature of the overall system.

## Key Responsibilities

* **Product Listing:** Offers a list of available ticket products.
* **Stock Availability:** Manages and reports real-time stock for its tickets.
* **Reservation:** Handles requests to reserve ticket items.
* **Order Confirmation:** Processes and confirms orders for reserved tickets.
* **Data Storage:** Stores its own product and stock data in a dedicated data center, separate from the broker and other suppliers.