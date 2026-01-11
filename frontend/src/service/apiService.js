import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

const cleanParams = (params) => {
    return Object.fromEntries(
        Object.entries(params)
            .filter(([_, value]) => {
                if (value === null || value === undefined) return false;
                if (typeof value === 'string' && value.trim() === '') return false;
                return true;
            })
    );
};


const apiService = {
    /**
     * 모든 todo 조회
     */
    getTodoAll: async () => {
        try {
            const res = await api.get('/todo/all');
            return res.data;
        } catch (error) {
            alert("데이터를 가져올 수 없습니다.");
            return [];
        }
    },

    /**
     * todo 추가
     */
    addTodo: async (todoData) => {
        try {
            await api.post('/todo', todoData);
        } catch (error) {
            alert("todo 추가 실패 : {}", error);
        }
    },

    /**
     * todo 수정
     */
    updateTodo: async (todoNo, todoData) => {
        try {
            await api.put(`/todo/${todoNo}`, todoData);
        } catch (error) {
            alert("todo 수정 실패 : {}", error);
        }
    },

    /**
     * todo 삭제
     */
    deleteTodo: async (todoNo) => {
        try {
            await api.delete(`/todo/${todoNo}`);
        } catch (error) {
            alert("todo 삭제 실패 : {}", error);
        }
    },

    /**
     * todo 상태 변경
     */
    changeStatus: async (todoNo, newStatus) => {
        try {
            await api.patch(`/todo/${todoNo}/status`, {
                status: newStatus
            });
        } catch (error) {
            alert("상태 변경 실패 : {}", error);
        }
    },

    /**
     * ledger 조회
     */
    // getLedgersByFilter: (filter) => api.get(
    //     '/ledger/all',
    //     { params: filter }).then(res => res.data),
    getLedgersByFilter: (filter) => {
        const cleaned = cleanParams(filter);
        return api.get('/ledger/all', { params: cleaned })
            .then(res => res.data);
    },

    /**
     * ledger 추가
     */
    addLedger: async (ledgerData) => {
        try {
            await api.post('/ledger', ledgerData);
        } catch (error) {
            alert("ledger 추가 실패 : {}", error);
        }
    },

    /**
     * ledger 수정
     */
    updateLedger: async (ledgerId, ledgerData) => {
        try {
            await api.put(`/ledger/${ledgerId}`, ledgerData);
        } catch (error) {
            alert("ledger 수정 실패 : {}", error);
        }
    },

    /**
     * ledger 삭제
     */
    deleteLedger: async (ledgerId) => {
        try {
            await api.delete(`/ledger/${ledgerId}`);
        } catch (error) {
            alert("ledger 삭제 실패 : {}", error);
        }
    },



};

export default apiService;