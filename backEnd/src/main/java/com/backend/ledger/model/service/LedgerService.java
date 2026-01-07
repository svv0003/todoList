package com.backend.ledger.model.service;

import com.backend.ledger.model.dto.Ledger;
import com.backend.todo.model.dto.Todo;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

public interface LedgerService {


    // 전체 ledger 조회
    List<Todo> getAllLedgers();

    // 특정 ledger 조회
    Todo getLedgerById(int todoNo);

//    // 상태별 Todo 조회
//    List<Todo> getTodosByStatus(String status);

//    // 우선순위별 조회
//    List<Todo> getTodosByPriority(String priority);

    // ledger 생성
    void createLedger(Ledger ledger);

    // ledger 수정
    void updateLedger(Ledger ledger);

    // ledger 삭제
    void deleteLedger(int ledgerId);

//    // 통계 조회
//    Map<String, Integer> getStatistics();

}
