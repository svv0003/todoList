import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import TodoForm from '../components/TodoForm';

const TodoWrite = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const existingTodo = location.state?.todo;
    const isEdit = !!existingTodo;

    const handleSubmit = async (todoData) => {
        try {
            if (isEdit) {
                await axios.put(`/api/todo/${existingTodo.todoNo}`, todoData);
                alert('수정되었습니다.');
            } else {
                await axios.post('/api/todo', todoData);
                alert('등록되었습니다.');
            }
            navigate('/todo');
        } catch (error) {
            console.error('저장 실패:', error);
            alert(isEdit ? '수정에 실패했습니다.' : '등록에 실패했습니다.');
        }
    };

    return (
        <div className="todo-write-page">
            <div className="page-header">
                <button className="back-btn" onClick={() => navigate('/todo')}>
                    ← 취소
                </button>
                <h1>{isEdit ? '할 일 수정' : '할 일 등록'}</h1>
            </div>

            <div className="form-container">
                <TodoForm
                    onSubmit={handleSubmit}
                    initialData={existingTodo}
                    isEdit={isEdit}
                />
            </div>
        </div>
    );
};

export default TodoWrite;