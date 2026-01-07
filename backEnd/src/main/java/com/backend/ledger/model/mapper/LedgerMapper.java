package com.backend.ledger.model.mapper;

import com.backend.ledger.model.dto.Ledger;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LedgerMapper {

    void insertLedger(Ledger ledger);
    void updateLedger(Ledger ledger);
    void deleteLedger(int ledgerId);
}
