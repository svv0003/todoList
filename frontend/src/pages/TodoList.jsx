import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from "../components/Header";
import apiService from '../service/apiService';

const TodoList = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('ALL');        // 'ALL', 'PENDING', 'IN_PROGRESS', 'COMPLETED'
    const [sortBy, setSortBy] = useState('dueDate');    // 'dueDate', 'priority', 'createdAt'
    const loginUser = JSON.parse(localStorage.getItem("user") || '[]');
    const loginUserId = loginUser.userId;

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        setLoading(true);
        try {
            const res = await apiService.getTodoAll();
            setTodos(res);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    // 필터 변경
    const handleFilterChange = (filter) => {
    }

    // 정렬 변경
    const handleSortChange = (sortBy) => {
    }

    // 삭제
    const handleDelete = async (todoNo) => {
        try {
            await apiService.deleteTodo(todoNo);
        } catch (error) {
            console.log(error);
        }
    }

    // 상태 변경
    const handleToggleStatus = async (todoNo, newStatus) => {
        try {
            await apiService.changeStatus(todoNo, newStatus);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Header />
        </>
    )
};

export default TodoList;