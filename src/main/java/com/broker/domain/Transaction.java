package com.broker.domain;


import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name= "dbo.transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer package_id;
    private String address;
    private boolean paid;
    private Date order_time;
    private int accom_id;
    private int ticket_id;
    private String status;
    @Column(name="last_updated")
    private LocalDateTime lastUpdated;
    private Integer orderId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPackage_id() {
        return package_id;
    }

    public void setPackage_id(Integer package_id) {
        this.package_id = package_id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public boolean isPaid() {
        return paid;
    }

    public void setPaid(boolean paid) {
        this.paid = paid;
    }

    public Date getOrder_time() {
        return order_time;
    }

    public void setOrder_time(Date order_time) {
        this.order_time = order_time;
    }

    public int getAccom_id() {
        return accom_id;
    }

    public void setAccom_id(int accom_id) {
        this.accom_id = accom_id;
    }

    public int getTicket_id() {
        return ticket_id;
    }

    public void setTicket_id(int ticket_id) {
        this.ticket_id = ticket_id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
    public Integer getOrderId() {
        return orderId;
    }
    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }
    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Transaction that = (Transaction) o;
        return paid == that.paid && accom_id == that.accom_id && ticket_id == that.ticket_id && Objects.equals(id, that.id) && Objects.equals(package_id, that.package_id) && Objects.equals(address, that.address) && Objects.equals(order_time, that.order_time) && Objects.equals(status, that.status) && Objects.equals(lastUpdated, that.lastUpdated) && Objects.equals(orderId, that.orderId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, package_id, address, paid, order_time, accom_id, ticket_id, status, lastUpdated, orderId);
    }




}
