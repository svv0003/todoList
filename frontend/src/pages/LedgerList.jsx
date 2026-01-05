import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from "../components/Header";
import apiService from '../service/apiService';
import TodoItem from "../components/TodoItems";
import LedgerFilter from "../components/LedgerFilter";
import LedgerStatistics from "../components/LedgerStatistics";

const LedgerList = () => {

    const navigate = useNavigate();
    const [lists, setLists] = useState([]);
    const [filter, setFilter] = useState('ALL');
    const [sortBy, setSortBy] = useState('dueDate');
    const [loading, setLoading] = useState(false);
    const loginUser = JSON.parse(localStorage.getItem("user") || '{}');
    const loginUserId = loginUser.userId;

    useEffect(() => {
        // fetchLists();
    }, [])

    const fetchLists = async () => {
        setLoading(true);
        try {
            const res = await apiService.getThisMonth();
            setLists(res || []);
        } catch (error) {
            console.error('내역 조회 실패: ', error);
            alert('내역을 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    }

    // 필터 변경
    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    }

    // 정렬 변경
    const handleSortChange = (newSort) => {
        setSortBy(newSort);
    }

    // 삭제
    const handleDelete = async (ledgerId) => {
        try {
            await apiService.deleteList(ledgerId);
            setLists(lists.filter(list => list.ledgerId !== ledgerId));
            alert('삭제되었습니다.');
        } catch (error) {
            console.error('삭제 실패: ', error);
            alert('삭제에 실패했습니다.');
        }
    }

    // 상태 변경
    const handleToggleStatus = async (ledgerId, newStatus) => {
        try {
            console.log("click ledgerId: ", ledgerId);
            await apiService.changeStatus(ledgerId, newStatus);
            setLists(lists.map(list =>
                list.listId === ledgerId
                    ? {...list, listStatus: newStatus}
                    : list
            ));
        } catch (error) {
            console.error('상태 변경 실패: ', error);
            alert('상태 변경에 실패했습니다.');
        }
    }

    // 필터링
    const filteredLists = lists.filter(list => {
        if (filter === 'ALL') return true;
        return list.listStatus === filter;
    });

    // 정렬
    const sortedLists = [...filteredLists].sort((a, b) => {
        switch (sortBy) {
            case 'price':
                const priorityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            case 'createdAt':
                return new Date(b.createdAt) - new Date(a.createdAt);
            default:
                return 0;
        }
    });


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
            <LedgerStatistics lists={lists} />

            <div className="filter-section">
                <LedgerFilter
                    currentFilter={filter}
                    onFilterChange={handleFilterChange}/>

                <div className="sort-section">
                    <button
                        className="create-btn-mobile"
                        onClick={() => navigate('/ledger/write')}>
                        추가
                    </button>
                    <div>
                        <select value={sortBy}
                                onChange={(e) =>
                                    handleSortChange(e.target.value)}>
                            <option value="price">가격순</option>
                            <option value="createdAt">최신순</option>
                        </select>
                    </div>
                </div>
            </div>

            {loading
                ? (<div className="loading">로딩중...</div>)
                : sortedLists.length === 0
                    ? (<div className="empty-message">
                            {filter === 'ALL'
                                ? '등록된 내역이 없습니다.'
                                : '해당하는 내역이 없습니다.'}
                    </div>)
                    : (<div className="todo-list">
                            {sortedLists.map(list => (
                                <TodoItem
                                    key={list.listId}
                                    todo={list}
                                    onToggle={handleToggleStatus}
                                    onDelete={handleDelete}/>
                            ))}
                    </div>)}
        </div>
    );
};

export default LedgerList;