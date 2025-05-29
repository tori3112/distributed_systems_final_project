package com.broker.domain;
import javax.persistence.*;
import java.util.Objects;
import java.util.Date;
@Entity
@Table(name= "dbo.orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer package_id;
    private String address;
    private boolean paid;
    private Date order_time;

    public int getId() {
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

    public void setPaid(boolean payment) {
        this.paid = payment;
    }
    public Date getOrder_time() {
        return order_time;
    }

    public void setOrder_time(Date order_time) {
        this.order_time = order_time;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Order order = (Order) o;
        return paid == order.paid && Objects.equals(id, order.id) && Objects.equals(package_id, order.package_id) && Objects.equals(address, order.address) && Objects.equals(order_time, order.order_time);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, package_id, address, paid, order_time);
    }
}
