# Accommodation Supplier Service

This directory contains the source code for one external supplier services, specifically providing **accommodations**. This service simulates an independent company participating in the distributed web shop ecosystem.

## Overview

The Accommodation Supplier Service exposes its products and real-time stock availability via a defined REST API. It is responsible for handling reservations and confirming orders for accommodation items. Crucially, it operates as a separate administration domain, simulating a distinct business entity within the distributed system.

## Key Responsibilities

* **Product Listing:** Provides a list of available accommodation products.
* **Stock Availability:** Manages and reports real-time stock availability for its products.
* **Reservation:** Handles requests to reserve accommodation items.
* **Order Confirmation:** Processes and confirms orders for reserved accommodation.
* **Data Storage:** Stores its own product and stock data in an appropriate data center, separate from the broker and other suppliers.