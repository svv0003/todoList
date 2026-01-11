import React from 'react';

const LedgerFilter = ({ currentFilter, onFilterChange }) => {

    const handleChange = (key, value) => {
        onFilterChange({ [key]: value });
    };

    return (
        <div className="ledger-filter">

            {/* 기간 타입 */}
            <div className="filter-group">
                <label>기간</label>
                <select
                    value={currentFilter.periodType}
                    onChange={(e) => handleChange('periodType', e.target.value)}
                >
                    <option value="currentMonth">이번 달</option>
                    <option value="lastMonth">지난 달</option>
                    <option value="custom">직접 선택</option>
                </select>
            </div>

            {/* 검색어 */}
            <div className="filter-group">
                <label>검색</label>
                <input
                    type="text"
                    placeholder="내용 검색"
                    value={currentFilter.searchKeyword || ''}
                    onChange={(e) =>
                        handleChange('searchKeyword', e.target.value)
                    }
                />
            </div>

            {/* 카테고리 그룹 */}
            <div className="filter-group">
                <label>카테고리 그룹</label>
                <select
                    value={currentFilter.ledgerCategoryGroup || ''}
                    onChange={(e) =>
                        handleChange('ledgerCategoryGroup', e.target.value || null)
                    }
                >
                    <option value="">전체</option>
                    <option value="FOOD">식비</option>
                    <option value="TRANSPORT">교통</option>
                    <option value="LIVING">생활</option>
                </select>
            </div>

            {/* 날짜 직접 선택 (custom일 때만 노출해도 됨) */}
            <div className="filter-group">
                <label>시작일</label>
                <input
                    type="date"
                    value={currentFilter.startDate || ''}
                    onChange={(e) =>
                        handleChange('startDate', e.target.value)
                    }
                />
            </div>

            <div className="filter-group">
                <label>종료일</label>
                <input
                    type="date"
                    value={currentFilter.endDate || ''}
                    onChange={(e) =>
                        handleChange('endDate', e.target.value)
                    }
                />
            </div>

        </div>
    );
};

export default LedgerFilter;
