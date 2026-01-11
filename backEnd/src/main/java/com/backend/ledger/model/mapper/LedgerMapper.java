package com.backend.ledger.model.mapper;

import com.backend.ledger.model.dto.Ledger;
import com.backend.ledger.model.dto.LedgerFilter;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface LedgerMapper {

    List<Ledger> selectLedgersByFilters(LedgerFilter filter);
    Ledger selectLedgerById(int ledgerId);
    void insertLedger(Ledger ledger);
    void updateLedger(Ledger ledger);
    void deleteLedger(int ledgerId);
}
