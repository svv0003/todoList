import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

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
        }
    },

    /**
     * todo 삭제
     */
    deleteTodo: async (todoNo) => {
        try {
            await api.delete(`/todo/${todoNo}`);
        } catch (error) {
            alert("삭제 실패 : {}", error);
        }
    },

    /**
     * todo 상태 변경
     * */
    changeStatus: async (todoNo, newStatus) => {
        try {
            await api.patch(`/todo/${todoNo}/status`, {
                status: newStatus
            });
        } catch (error) {
            alert("상태 변경 실패 : {}", error);
        }
    },

};

export default apiService;