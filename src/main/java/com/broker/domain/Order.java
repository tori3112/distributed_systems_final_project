package com.broker.domain;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Date;
@Entity
@Table(name= "dbo.orders")
public class Order {
    @Id
    private Integer id;
    private Integer package_id;
    private String address;
    private boolean paid;
    private Date order_time;
    private Integer accom_id;
    private Integer ticket_id;
    private Integer amount;

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

    public Integer getAccom_id() {
        return accom_id;
    }

    public void setAccom_id(Integer accom_id) {
        this.accom_id = accom_id;
    }

    public Integer getTicket_id() {
        return ticket_id;
    }

    public void setTicket_id(Integer ticket_id) {
        this.ticket_id = ticket_id;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Order order = (Order) o;
        return paid == order.paid && Objects.equals(id, order.id) && Objects.equals(package_id, order.package_id) && Objects.equals(address, order.address) && Objects.equals(order_time, order.order_time) && Objects.equals(accom_id, order.accom_id) && Objects.equals(ticket_id, order.ticket_id) && Objects.equals(amount, order.amount);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, package_id, address, paid, order_time, accom_id, ticket_id, amount);
    }
}
