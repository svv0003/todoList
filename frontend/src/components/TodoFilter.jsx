import React from 'react';

const TodoFilter = ({ currentFilter, onFilterChange }) => {
    const filters = [
        { value: 'ALL', label: '전체' },
        { value: 'PENDING', label: '대기중' },
        { value: 'IN_PROGRESS', label: '진행중' },
        { value: 'COMPLETED', label: '완료' }
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

export default TodoFilter;