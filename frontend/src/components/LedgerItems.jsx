// LedgerItems.tsx
import React from 'react';
import { useNavigate } from "react-router-dom";
// src/utils/categoryUtils.ts
import {
    INCOME_CATEGORY_GROUPS,
    EXPENSE_CATEGORY_GROUPS,
    PAYMENT_METHODS,
    PAYMENT_INSTALLMENT,
} from './LedgerForm';

// 그룹 라벨 찾기 (ledgerCategoryGroup 값 → 한국어)
export const getCategoryGroupLabel = (type: 'INCOME' | 'EXPENSE', groupValue: string): string => {
    const groups = type === 'INCOME' ? INCOME_CATEGORY_GROUPS : EXPENSE_CATEGORY_GROUPS;
    const found = groups.find(g => g.group === groupValue);
    return found ? found.label : groupValue || '-';
};

// 세부 카테고리 라벨 찾기 (ledgerCategory 값 → 한국어)
export const getCategoryLabel = (type: 'INCOME' | 'EXPENSE', categoryValue: string): string => {
    const groups = type === 'INCOME' ? INCOME_CATEGORY_GROUPS : EXPENSE_CATEGORY_GROUPS;
    for (const group of groups) {
        const item = group.items.find(i => i.value === categoryValue);
        if (item) return item.label;
    }
    return categoryValue || '-';
};

// 결제수단 라벨 찾기 (ledgerPayment 값 → 한국어)
export const getledgerPaymentLabel = (paymentValue: string): string => {
    for (const group of PAYMENT_METHODS) {
        const item = group.items.find(i => i.value === paymentValue);
        if (item) return item.label;
    }
    return paymentValue || '-';
};

// 할부 개월 라벨 찾기 (ledgerPaymentInstallment 값 → 한국어)
export const getInstallmentLabel = (installmentValue: number | string): string => {
    const valueStr = String(installmentValue);
    for (const group of PAYMENT_INSTALLMENT) {
        if (group.group === 'EXPENSE') {  // 지출만 할부 있음
            const item = group.items.find(i => i.value === valueStr);
            if (item) return item.label;
        }
    }
    return valueStr === '1' ? '일시불' : `${valueStr}개월`;
};





const LedgerItems = ({ ledger, onDelete }) => {
    const navigate = useNavigate();
    if (!ledger) return null;

    const {
        ledgerId,
        ledgerType,
        ledgerDescription,
        ledgerPrice,
        ledgerPaymentDate,
        ledgerPaymentInstallment,
        ledgerCategoryGroup = '',
        ledgerCategory = '',
        ledgerPayment = '',
    } = ledger;

    const isExpense = ledgerType === 'EXPENSE';
    const priceSign = isExpense ? '-' : '+';
    const priceClass = isExpense ? 'price expense' : 'price income';

    return (
        <div
            className="ledger-row"
            onClick={() => navigate(`/ledger/${ledgerId}`)}>

            <div className="ledger-col date">
                {ledgerPaymentDate || '-'}
            </div>

            <div className="ledger-col group">
                {getCategoryGroupLabel(ledgerType, ledgerCategoryGroup)}
            </div>

            <div className="ledger-col category">
                {getCategoryLabel(ledgerType, ledgerCategory)}
            </div>

            <div className="ledger-col description main-content">
                <div className="desc-text">{ledgerDescription || '내역 없음'}</div>
                <div className="desc-date mobile-only">{ledgerPaymentDate || ''}</div>
            </div>

            <div className={priceClass}>
                {priceSign}{(ledgerPrice ?? 0).toLocaleString()}원
            </div>

            <div className="ledger-col method desktop-only">
                {getledgerPaymentLabel(ledgerPayment)}
            </div>

            <div className="ledger-col installment desktop-only">
                {getInstallmentLabel(ledgerPaymentInstallment)}
            </div>
        </div>
    );
};

export default LedgerItems;