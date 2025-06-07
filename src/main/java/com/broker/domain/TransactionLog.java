package com.broker.domain;


import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
public class TransactionLog {
    @Id
    private int transactionId;
    private enum status{PREPARED,COMMITTED,ABORTED};
    private LocalDateTime lastUpdated;

    public int getTransactionId() {
        return transactionId;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        TransactionLog that = (TransactionLog) o;
        return transactionId == that.transactionId && Objects.equals(lastUpdated, that.lastUpdated);
    }

    @Override
    public int hashCode() {
        return Objects.hash(transactionId, lastUpdated);
    }

    public void setTransactionId(int transactionId) {
        this.transactionId = transactionId;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}



