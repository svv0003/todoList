import React, {useState, useEffect, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from "../components/Header";
import apiService from '../service/apiService';
import LedgerFilter from "../components/LedgerFilter";
import LedgerStatistics from "../components/LedgerStatistics";
import LedgerItems from "../components/LedgerItems";
import LedgerSearchFilter from "../components/LedgerSearchFilter";

const LedgerList = () => {

    const navigate = useNavigate();

    const [filter, setFilter] = useState({
        periodType: 'currentMonth',
        ledgerCategoryGroup: null,
        ledgerCategory: null,
        searchKeyword: '',
        year: null,
        month: null,
        startDate: null,
        endDate: null,
    });

    const [typeFilter, setTypeFilter] = useState('ALL');
    const [sortBy, setSortBy] = useState('paymentDateDesc');

    const [tempFilter, setTempFilter] = useState(filter);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [ledgers, setLedgers] = useState([]);
    const [loading, setLoading] = useState(false);

    const loginUser = JSON.parse(localStorage.getItem("user") || '{}');
    const loginUserId = loginUser.userId;

    useEffect(() => {
        fetchLedgers();
    }, [filter])

    const fetchLedgers = async () => {
        setLoading(true);
        try {
            const res = await apiService.getLedgersByFilter(filter);
            setLedgers(res || []);
        } catch (error) {
            console.error('내역 조회 실패: ', error);
            alert('내역을 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    }

    // 소득/지출/할부 필터링
    const filteredLedgers = useMemo(() => {
        return ledgers.filter(ledger => {
            switch (typeFilter) {
                case 'INCOME':
                    return ledger.ledgerType === 'INCOME';
                case 'EXPENSE':
                    return ledger.ledgerType === 'EXPENSE';
                case 'INSTALLMENT':
                    return ledger.ledgerPaymentInstallment > 1;
                case 'ALL':
                default:
                    return true;
            }
        });
    }, [ledgers, typeFilter]);


    // 필터링된 결과 정렬
    // 원본 복제 후 정렬하도록 한다.
    const getSortedLedgers = [...filteredLedgers].sort((a, b) => {
        switch (sortBy) {
            case 'paymentDateAsc':
                return new Date(a.ledgerPaymentDate) - new Date(b.ledgerPaymentDate);
            case 'paymentDateDesc':
                return new Date(b.ledgerPaymentDate) - new Date(a.ledgerPaymentDate);
            case 'priceDesc':
                return Number(b.ledgerPrice) - Number(a.ledgerPrice);
            case 'priceAsc':
                return Number(a.ledgerPrice) - Number(b.ledgerPrice);
            default:
                return new Date(b.ledgerPaymentDate) - new Date(a.ledgerPaymentDate);
        }
    });

    // 정렬 변경
    // const displayLedgers = useMemo(() => {
    //     return getSortedLedgers(filteredLedgers, sortBy);
    // }, [filteredLedgers, sortBy]);


    const handleSortChange = (value) => {
        console.log("기존 :", sortBy, "새 값: ", value);
        setSortBy(value);
    };

    // 삭제
    const handleDelete = async (ledgerId) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;
        try {
            await apiService.deleteLedger(ledgerId);
            setLedgers(prev => prev.filter(l => l.ledgerId !== ledgerId));
            alert('삭제되었습니다.');
        } catch (error) {
            console.error('삭제 실패: ', error);
            alert('삭제에 실패했습니다.');
        }
    };


    return (
        <div className="todo-list-page">
            <div className="page-header">
                <h1>가계부 관리</h1>
                <button
                    className="create-btn"
                    onClick={() => navigate('/ledger/write')}>
                    추가
                </button>
            </div>

            {/*<TodoStatistics />*/}
            {/* 상태 변경 시 실시간 화면 반영하도록 수정 */}
            <LedgerStatistics lists={ledgers} />

            <div className="filter-section">
                <LedgerFilter
                    currentFilter={typeFilter}
                    onFilterChange={setTypeFilter}/>

                <div className="sort-section">
                    <button
                        className="create-btn-mobile"
                        onClick={() => navigate('/ledger/write')}>
                        추가
                    </button>
                    <button
                        className="filterBtn"
                        onClick={() => {
                            setTempFilter(filter);
                            setIsFilterOpen(true);
                        }}>
                        필터
                    </button>
                    <div>
                        <select value={sortBy}
                                onChange={(e) =>
                                    handleSortChange(e.target.value)}>
                            <option value="paymentDateDesc">최신순</option>
                            <option value="paymentDateAsc">오래된순</option>
                            <option value="priceDesc">금액 높은순</option>
                            <option value="priceAsc">금액 낮은순</option>
                        </select>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="loading">로딩중...</div>
            ) : ledgers.length === 0 ? (
                <div className="empty">조회된 내역이 없습니다.</div>
            ) : <div className="ledger-list">
                    {getSortedLedgers.map(ledger => (
                        <LedgerItems
                            // key={ledger.ledgerId}
                            key={`${ledger.ledgerId}`}
                            ledger={ledger}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            }

            {isFilterOpen && (
                <div className="filter-modal-overlay">
                    <div className="filter-modal">
                        <div className="modal-header">
                            <h2>필터</h2>
                            <button onClick={() => setIsFilterOpen(false)}>✕</button>
                        </div>

                        <div className="modal-body">
                            <LedgerSearchFilter
                                currentFilter={tempFilter}
                                onFilterChange={(newFilter) =>
                                    setTempFilter(prev => ({ ...prev, ...newFilter }))
                                }
                            />
                        </div>

                        <div className="modal-footer">
                            <button
                                className="reset-btn"
                                onClick={() =>
                                    setTempFilter({
                                        periodType: 'currentMonth',
                                        ledgerCategoryGroup: null,
                                        ledgerCategory: null,
                                        searchKeyword: '',
                                        year: null,
                                        month: null,
                                        startDate: null,
                                        endDate: null,
                                    })
                                }>
                                초기화
                            </button>

                            <button
                                className="apply-btn"
                                onClick={() => {
                                    setFilter(tempFilter);
                                    setIsFilterOpen(false);
                                }}>
                                적용
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LedgerList;