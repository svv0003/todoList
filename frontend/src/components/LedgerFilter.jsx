import React from 'react';

const LedgerFilter = ({ currentFilter, onFilterChange }) => {
    const filters = [
        { value: 'ALL', label: '전체' },
        { value: 'INCOME', label: '소득' },
        { value: 'EXPENSE', label: '지출' },
        { value: 'INSTALLMENT', label: '할부' }
    ];

    return (
        <div className="todo-filter">
            {filters.map(filter => (
                <button
                    key={filter.value}
                    className={`filter-btn ${currentFilter === filter.value ? 'active' : ''}`}
                    onClick={() => onFilterChange(filter.value)}>
                    {filter.label}
                </button>
            ))}
        </div>
    );
};

export default LedgerFilter;