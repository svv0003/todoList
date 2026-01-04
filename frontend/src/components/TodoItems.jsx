import React from 'react';
import { useNavigate } from 'react-router-dom';

const TodoItem = ({ todo, onToggle, onDelete }) => {
    const navigate = useNavigate();

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'HIGH': return 'priority-high';
            case 'MEDIUM': return 'priority-medium';
            case 'LOW': return 'priority-low';
            default: return '';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'PENDING': return '대기중';
            case 'IN_PROGRESS': return '진행중';
            case 'COMPLETED': return '완료';
            default: return status;
        }
    };

    const handleToggleStatus = () => {
        let newStatus;
        if (todo.todoStatus === 'PENDING') {
            newStatus = 'IN_PROGRESS';
        } else if (todo.todoStatus === 'IN_PROGRESS') {
            newStatus = 'COMPLETED';
        } else {
            newStatus = 'PENDING';
        }
        onToggle(todo.todoNo, newStatus);
    };

    return (
        <div className={`todo-item ${todo.todoStatus === 'COMPLETED' ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={todo.todoStatus === 'COMPLETED'}
                onChange={handleToggleStatus}
                className="todo-checkbox" />

            <div className="todo-content" onClick={() => navigate(`/todo/${todo.todoNo}`)}>
                <h3 className="todo-title">{todo.todoTitle}</h3>
                <div className="todo-meta">
                    <span className={`priority-badge ${getPriorityColor(todo.priority)}`}>
                        {todo.priority}
                    </span>
                    <span className="status-badge">{getStatusText(todo.todoStatus)}</span>
                    {todo.dueDate && (
                        <span className="due-date">📅 {todo.dueDate}</span>
                    )}
                </div>
            </div>

            <button
                className="delete-btn"
                onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm('정말 삭제하시겠습니까?')) {
                        onDelete(todo.todoNo);
                    }
                }}
            >
                🗑️
            </button>
        </div>
    );
};

export default TodoItem;