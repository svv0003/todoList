import React from 'react';

const LedgerItems = ({ ledger, onDelete }) => {
    if (!ledger) return null;

    const {
        ledgerId,
        ledgerType,
        ledgerDescription,
        ledgerPrice,
        ledgerPaymentDate,
        ledgerPaymentInstallment,
    } = ledger;

    return (
        <div className="ledger-item">

            <div className="ledger-item-left">
                <div className={`type ${ledgerType?.toLowerCase()}`}>
                    {ledgerType === 'INCOME' ? '소득' : '지출'}
                </div>

                <div className="content">
                    <div className="title">
                        {ledgerDescription || ''}
                    </div>
                    <div className="date">
                        {ledgerPaymentDate || ''}
                    </div>
                </div>
            </div>

            <div className="ledger-item-right">
                <div className="price">
                    {ledgerType === 'EXPENSE' && '-'}
                    {typeof ledgerPrice === 'number'
                        ? ledgerPrice.toLocaleString()
                        : '0'}
                    원
                </div>

                {ledgerPaymentInstallment >= 2 && (
                    <div className="installment">
                        {ledgerPaymentInstallment}개월 할부
                    </div>
                )}

                <button
                    className="delete-btn"
                    onClick={() => onDelete(ledgerId)}
                >
                    삭제
                </button>
            </div>

        </div>
    );
};

export default LedgerItems;
