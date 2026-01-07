package com.backend.ledger.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Ledger {

    private int ledgerId;
    private String ledgerType;
    private String ledgerCategoryGroup;
    private String ledgerCategory;
    private int ledgerPrice;
    private String ledgerPayment;
    private String ledgerPaymentDate;
    private int ledgerPaymentInstallment;
    private String ledgerDescription;
    private String createdAt;
    private String updatedAt;
}
