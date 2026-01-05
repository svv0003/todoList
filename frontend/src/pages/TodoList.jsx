import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from "../components/Header";
import apiService from '../service/apiService';
import TodoItem from "../components/TodoItems";
import TodoFilter from "../components/TodoFilter";
import TodoStatistics from "../components/TodoStatistics";

const TodoList = () => {

    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('ALL');        // 'ALL', 'PENDING', 'IN_PROGRESS', 'COMPLETED'
    const [sortBy, setSortBy] = useState('dueDate');    // 'dueDate', 'priority', 'createdAt'
    const [loading, setLoading] = useState(false);
    const loginUser = JSON.parse(localStorage.getItem("user") || '{}');
    const loginUserId = loginUser.userId;

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        setLoading(true);
        try {
            const res = await apiService.getTodoAll();
            setTodos(res || []);
        } catch (error) {
            console.error('할 일 목록 조회 실패: ', error);
            alert('할 일 목록을 불러오는데 실패했습니다.');
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
    const handleDelete = async (todoNo) => {
        try {
            await apiService.deleteTodo(todoNo);
            setTodos(todos.filter(todo => todo.todoNo !== todoNo));
            alert('삭제되었습니다.');
        } catch (error) {
            console.error('삭제 실패: ', error);
            alert('삭제에 실패했습니다.');
        }

    }

    // 상태 변경
    const handleToggleStatus = async (todoNo, newStatus) => {
        try {
            console.log("clickTodoNo: ", todoNo);
            await apiService.changeStatus(todoNo, newStatus);
            setTodos(todos.map(todo =>
                todo.todoNo === todoNo
                    ? {...todo, todoStatus: newStatus}
                    : todo
            ));
        } catch (error) {
            console.error('상태 변경 실패: ', error);
            alert('상태 변경에 실패했습니다.');
        }
    }

    // 필터링
    const filteredTodos = todos.filter(todo => {
        if (filter === 'ALL') return true;
        return todo.todoStatus === filter;
    });

    // 정렬
    const sortedTodos = [...filteredTodos].sort((a, b) => {
        switch (sortBy) {
            case 'dueDate':
                if (!a.dueDate) return 1;
                if (!b.dueDate) return -1;
                return new Date(a.dueDate) - new Date(b.dueDate);
            case 'priority':
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
                <h1>할 일 관리</h1>
                <button
                    className="create-btn"
                    onClick={() => navigate('/todo/write')}>
                    새로운 할 일
                </button>
            </div>

            {/*<TodoStatistics />*/}
            {/* 상태 변경 시 실시간 화면 반영하도록 수정 */}
            <TodoStatistics todos={todos} />

            <div className="filter-section">
                <TodoFilter
                    currentFilter={filter}
                    onFilterChange={handleFilterChange}/>

                <div className="sort-section">
                    <button
                        className="create-btn-mobile"
                        onClick={() => navigate('/todo/write')}>
                        할 일 추가
                    </button>
                    <div>
                        <select value={sortBy}
                                onChange={(e) =>
                                    handleSortChange(e.target.value)}>
                            <option value="dueDate">마감일순</option>
                            <option value="priority">우선순위순</option>
                            <option value="createdAt">최신순</option>
                        </select>
                    </div>
                </div>
            </div>

            {loading
                ? (<div className="loading">로딩중...</div>)
                : sortedTodos.length === 0
                    ? (<div className="empty-message">
                            {filter === 'ALL'
                                ? '등록된 할 일이 없습니다.'
                                : '해당하는 할 일이 없습니다.'}
                    </div>)
                    : (<div className="todo-list">
                            {sortedTodos.map(todo => (
                                <TodoItem
                                    key={todo.todoNo}
                                    todo={todo}
                                    onToggle={handleToggleStatus}
                                    onDelete={handleDelete}
                                />
                            ))}
                    </div>)}
        </div>
    );
};

export default TodoList;