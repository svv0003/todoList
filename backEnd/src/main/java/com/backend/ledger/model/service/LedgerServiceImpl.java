package com.backend.ledger.model.service;


import com.backend.ledger.model.dto.Ledger;
import com.backend.ledger.model.dto.LedgerFilter;
import com.backend.ledger.model.mapper.LedgerMapper;
import com.backend.todo.model.dto.Todo;
import com.backend.todo.model.service.TodoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class LedgerServiceImpl implements LedgerService {

    private final LedgerMapper ledgerMapper;


    /**
     * 필터에 기본값을 적용하고, 입력값의 유효성을 검증합니다.
     */
    private void applyDefaultAndValidateFilter(LedgerFilter filter) {
        // periodType 기본값
        if (filter.getPeriodType() == null) {
            filter.setPeriodType("currentMonth");
        }

        // periodType에 따라 필요한 값 검증 및 기본값 설정
        switch (filter.getPeriodType()) {
            case "yearMonth":
                if (filter.getYear() == null) {
                    throw new IllegalArgumentException("yearMonth 조회 시 year 값은 필수입니다.");
                }
                if (filter.getMonth() == null || filter.getMonth() < 1 || filter.getMonth() > 12) {
                    throw new IllegalArgumentException("month는 1~12 사이 값이어야 합니다.");
                }
                break;

            case "year":
                if (filter.getYear() == null) {
                    throw new IllegalArgumentException("year 조회 시 year 값은 필수입니다.");
                }
                break;

            case "custom":
                if (filter.getStartDate() == null && filter.getEndDate() == null) {
                    throw new IllegalArgumentException("custom 기간 조회 시 startDate 또는 endDate 중 하나는 필수입니다.");
                }
                // 시작일 > 종료일 검증
                if (filter.getStartDate() != null && filter.getEndDate() != null &&
                        filter.getStartDate().isAfter(filter.getEndDate())) {
                    throw new IllegalArgumentException("시작일이 종료일보다 늦을 수 없습니다.");
                }
                break;

            case "currentMonth":
                // 기본값이므로 추가 검증 불필요
                break;

            default:
                throw new IllegalArgumentException("지원하지 않는 periodType: " + filter.getPeriodType());
        }

        // 기타 필터 기본값 보완 (필요 시)
        if (filter.getLedgerType() != null &&
                !Set.of("EXPENSE", "INCOME").contains(filter.getLedgerType())) {
            throw new IllegalArgumentException("ledgerType은 EXPENSE 또는 INCOME이어야 합니다.");
        }

        // searchKeyword가 너무 길면 자르거나 제한 (선택)
        if (filter.getSearchKeyword() != null && filter.getSearchKeyword().length() > 100) {
            log.warn("검색어 길이 제한 초과 → 앞 100자만 사용");
            filter.setSearchKeyword(filter.getSearchKeyword().substring(0, 100));
        }
    }


    @Override
    public List<Ledger> getAllLedgersByFilter(LedgerFilter filter) {
        // 1. 필터 객체 null 체크 (안전장치)
        if (filter == null) {
            filter = new LedgerFilter();
            log.warn("LedgerFilter == null -> 기본 이번 달 조회로 처리");
        }

        // 2. 기본값 보완 및 검증
        applyDefaultAndValidateFilter(filter);

        // 3. 로그로 어떤 필터가 적용되었는지 기록 (디버깅/운영에 매우 유용)
        log.info("Ledger 필터 조회 요청" +
                        "periodType: {}," +
                        "year: {}," +
                        "month: {}," +
                        "customDate: {}-{}, " +
                        "ledgerType: {}," +
                        "installmentOnly: {}," +
                        "categoryGroup: {}," +
                        "category: {}," +
                        "keyword: {}",
                filter.getPeriodType(),
                filter.getYear(),
                filter.getMonth(),
                filter.getStartDate(),
                filter.getEndDate(),
                filter.getLedgerType(),
                filter.getInstallmentOnly(),
                filter.getLedgerCategoryGroup(),
                filter.getLedgerCategory(),
                filter.getSearchKeyword());

        // 4. 실제 조회
        List<Ledger> ledgers = ledgerMapper.selectLedgersByFilters(filter);

        // 5. 결과가 없어도 빈 리스트 반환 (NotFoundException은 프론트에서 처리하는 경우가 많음)
        if (ledgers == null) {
            ledgers = Collections.emptyList();
        }

        log.info("조회 완료 - 결과 건수: {}", ledgers.size());
        return ledgers;
    }

    @Override
    public Ledger getLedgerById(int ledgerId) {
        return ledgerMapper.selectLedgerById(ledgerId);
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
