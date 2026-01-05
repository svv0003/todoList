// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
//
// /* 상태 변경 시 실시간 화면 반영하도록 수정 */
const LedgerStatistics = ({ lists }) => {
//     const total = lists.length;
//     const spend = lists.filter(l => l.listStatus === 'SPEND').length;
//     const earn = lists.filter(l => l.listStatus === 'EARN').length;
//     const installment = lists.filter(l => l.listStatus === 'INSTALLMENT').length;
//
//     const completionRate =
//         total === 0 ? 0 : Math.round((installment / total) * 100);
//
//     /*
//     연간 누적 소득
//     연간 누적 지출
//     월평균 지출
//     누적 소득
//     누적 지출
//
//      */
//     return (
//         <div className="todo-statistics">
//             <div className="stat-item">
//                 <div className="stat-value">{total}</div>
//                 <div className="stat-label">전체</div>
//             </div>
//
//             <div className="stat-item pending">
//                 <div className="stat-value">{spend}</div>
//                 <div className="stat-label">대기중</div>
//             </div>
//
//             <div className="stat-item in-progress">
//                 <div className="stat-value">{earn}</div>
//                 <div className="stat-label">진행중</div>
//             </div>
//
//             <div className="stat-item completed">
//                 <div className="stat-value">{installment}</div>
//                 <div className="stat-label">완료</div>
//             </div>
//
//             <div className="stat-item completion-rate">
//                 <div className="stat-value">{completionRate}%</div>
//                 <div className="stat-label">완료율</div>
//             </div>
//         </div>
//     );
};

export default LedgerStatistics;