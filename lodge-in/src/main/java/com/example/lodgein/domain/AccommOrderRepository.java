package com.example.lodgein.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.*;

public interface AccommOrderRepository extends JpaRepository<AccommOrder, Integer> {

    @Query("SELECT COUNT(a) FROM AccommOrder a WHERE a.preparationStatus = 'PREPARING' AND a.accommId = :accommId")
    public Integer countActivePrepares(@Param("accommId")Integer accommId);
    @Query("SELECT a FROM AccommOrder a WHERE a.preparationStatus = 'PREPARING'  AND a.accommId = :accommId")
    public AccommOrder findByAccommIdPrepare(Integer accommId);
    @Query("SELECT a FROM AccommOrder a WHERE a.preparationStatus = 'COMMIT'  AND a.accommId = :accommId")
    public AccommOrder findByAccommIdCommit(Integer accommId);

    Optional<AccommOrder> findByOrderId(Integer orderId);
}
