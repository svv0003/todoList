import React, { useState, useEffect } from 'react';
import axios from 'axios';

// const TodoStatistics = () => {
//     const [statistics, setStatistics] = useState({
//         total: 0,
//         pending: 0,
//         inProgress: 0,
//         completed: 0,
//         completionRate: 0
//     });
//
//     useEffect(() => {
//         fetchStatistics();
//     }, []);
//
//     const fetchStatistics = async () => {
//         try {
//             const response = await axios.get('/api/todo/statistics');
//             setStatistics(response.data);
//         } catch (error) {
//             console.error('통계 조회 실패:', error);
//         }
//     };
//
//     return (
//         <div className="todo-statistics">
//             <div className="stat-item">
//                 <div className="stat-value">{statistics.total}</div>
//                 <div className="stat-label">전체</div>
//             </div>
//
//             <div className="stat-item pending">
//                 <div className="stat-value">{statistics.pending}</div>
//                 <div className="stat-label">대기중</div>
//             </div>
//
//             <div className="stat-item in-progress">
//                 <div className="stat-value">{statistics.inProgress}</div>
//                 <div className="stat-label">진행중</div>
//             </div>
//
//             <div className="stat-item completed">
//                 <div className="stat-value">{statistics.completed}</div>
//                 <div className="stat-label">완료</div>
//             </div>
//
//             <div className="stat-item completion-rate">
//                 <div className="stat-value">{statistics.completionRate}%</div>
//                 <div className="stat-label">완료율</div>
//             </div>
//         </div>
//     );
// };
//
// export default TodoStatistics;

/* 상태 변경 시 실시간 화면 반영하도록 수정 */
const TodoStatistics = ({ todos }) => {
    const total = todos.length;
    const pending = todos.filter(t => t.todoStatus === 'PENDING').length;
    const inProgress = todos.filter(t => t.todoStatus === 'IN_PROGRESS').length;
    const completed = todos.filter(t => t.todoStatus === 'COMPLETED').length;

    const completionRate =
        total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
        <div className="todo-statistics">
            <div className="stat-item">
                <div className="stat-value">{total}</div>
                <div className="stat-label">전체</div>
            </div>

            <div className="stat-item pending">
                <div className="stat-value">{pending}</div>
                <div className="stat-label">대기중</div>
            </div>

            <div className="stat-item in-progress">
                <div className="stat-value">{inProgress}</div>
                <div className="stat-label">진행중</div>
            </div>

            <div className="stat-item completed">
                <div className="stat-value">{completed}</div>
                <div className="stat-label">완료</div>
            </div>

            <div className="stat-item completion-rate">
                <div className="stat-value">{completionRate}%</div>
                <div className="stat-label">완료율</div>
            </div>
        </div>
    );
};

export default TodoStatistics;