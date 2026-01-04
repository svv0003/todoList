import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TodoDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [todo, setTodo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTodoDetail();
    }, [id]);

    const fetchTodoDetail = async () => {
        try {
            const response = await axios.get(`/api/todo/${id}`);
            setTodo(response.data);
        } catch (error) {
            console.error('할 일 조회 실패:', error);
            alert('할 일을 불러오는데 실패했습니다.');
            navigate('/todo');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;

        try {
            await axios.delete(`/api/todo/${id}`);
            alert('삭제되었습니다.');
            navigate('/todo');
        } catch (error) {
            console.error('삭제 실패:', error);
            alert('삭제에 실패했습니다.');
        }
    };

    const handleEdit = () => {
        navigate(`/todo/write`, {
            state: { todo }
        });
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'PENDING': return '대기중';
            case 'IN_PROGRESS': return '진행중';
            case 'COMPLETED': return '완료';
            default: return status;
        }
    };

    const getPriorityText = (priority) => {
        switch (priority) {
            case 'HIGH': return '높음';
            case 'MEDIUM': return '보통';
            case 'LOW': return '낮음';
            default: return priority;
        }
    };

    if (loading) {
        return <div className="loading">로딩중...</div>;
    }

    if (!todo) {
        return <div className="error">할 일을 찾을 수 없습니다.</div>;
    }

    return (
        <div className="todo-detail-page">
            <div className="detail-header">
                <button className="back-btn"
                        onClick={() =>
                            navigate('/todo')}>
                    목록으로
                </button>
                <div className="action-buttons">
                    <button className="edit-btn"
                            onClick={handleEdit}>
                        수정
                    </button>
                    <button className="delete-btn"
                            onClick={handleDelete}>
                        삭제
                    </button>
                </div>
            </div>

            <div className="detail-content">
                <h1 className="detail-title">{todo.todoTitle}</h1>

                <div className="detail-meta">
                    <div className="meta-item">
                        <span className="meta-label">상태: </span>
                        <span className={`status-badge ${todo.todoStatus.toLowerCase()}`}>
                            {getStatusText(todo.todoStatus)}
                        </span>
                    </div>

                    <div className="meta-item">
                        <span className="meta-label">우선순위: </span>
                        <span className={`priority-badge ${todo.priority.toLowerCase()}`}>
                          {getPriorityText(todo.priority)}
                        </span>
                    </div>

                    {todo.dueDate && (
                        <div className="meta-item">
                            <span className="meta-label">마감일: </span>
                            <span className="meta-value">📅 {todo.dueDate}</span>
                        </div>
                    )}

                    <div className="meta-item">
                        <span className="meta-label">등록일: </span>
                        <span className="meta-value">📅 {todo.createdAt}</span>
                    </div>

                    {/*{todo.updatedAt*/}
                    {/*    && todo.updatedAt !== todo.createdAt*/}
                    {/*    && (<div className="meta-item">*/}
                    {/*            <span className="meta-label">수정일:</span>*/}
                    {/*            <span className="meta-value">{todo.updatedAt}</span>*/}
                    {/*        </div>*/}
                    {/*    )*/}
                    {/*}*/}
                </div>

                {todo.todoContent && (
                    <div className="detail-description">
                        <h3>상세 내용</h3>
                        <div className="content-text">
                            {todo.todoContent.split('\n').map((line, index) => (
                                <p key={index}>{line || '\u00A0'}</p>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TodoDetail;