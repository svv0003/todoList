package com.backend.ledger.model.service;


import com.backend.ledger.model.dto.Ledger;
import com.backend.ledger.model.mapper.LedgerMapper;
import com.backend.todo.model.dto.Todo;
import com.backend.todo.model.service.TodoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class LedgerServiceImpl implements LedgerService {

    private final LedgerMapper ledgerMapper;

    @Override
    public List<Todo> getAllLedgers() {
        return List.of();
    }

    @Override
    public Todo getLedgerById(int todoNo) {
        return null;
    }

    @Override
    public void createLedger(Ledger ledger) {
        ledgerMapper.insertLedger(ledger);
    }

    @Override
    public void updateLedger(Ledger ledger) {
        ledgerMapper.updateLedger(ledger);
    }

    @Override
    public void deleteLedger(int ledgerId) {
        ledgerMapper.deleteLedger(ledgerId);
    }
}
