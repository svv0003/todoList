package com.backend.ledger.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LedgerFilter {

    private String periodType;          // "currentMonth", "yearMonth", "year", "custom"
    private Integer year;               // 년도 지정
    private Integer month;              // 월 지정
    private LocalDate startDate;        // 조회 시작일 지정
    private LocalDate endDate;          // 조회 마감일 지정
    private String ledgerType;          // "EXPENSE", "INCOME"
    private Boolean installmentOnly;    // 할부 필터링
    private String ledgerCategoryGroup; // 카테고리 그룹 지정
    private String ledgerCategory;      // 카테고리 지정
    private String searchKeyword;       // 키워드 지정
}