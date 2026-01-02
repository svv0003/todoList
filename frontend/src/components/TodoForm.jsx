import React, {useState, useEffect} from 'react';
import apiService from "../service/apiService";

/*
import React, { useState, useEffect } from 'react';
import apiService from "../service/apiService";

const TodoForm = ({ onSubmit, initialData = {}, isEdit = false }) => {
    const [todoTitle, setTodoTitle] = useState(initialData.title || "");
    const [todoContent, setTodoContent] = useState(initialData.content || "");
    const [priority, setPriority] = useState(initialData.priority || "중간");
    const [dueDate, setDueDate] = useState(initialData.dueDate || "");
    const [todoStatus, setTodoStatus] = useState(initialData.status || "대기중");
    const [errors, setErrors] = useState({});

    // 편집 모드일 때 initialData 변경 시 상태 업데이트
    useEffect(() => {
        if (isEdit && initialData) {
            setTodoTitle(initialData.title || "");
            setTodoContent(initialData.content || "");
            setPriority(initialData.priority || "중간");
            setDueDate(initialData.dueDate || "");
            setTodoStatus(initialData.status || "대기중");
        }
    }, [initialData, isEdit]);

    // 유효성 검사
    const validateForm = () => {
        const newErrors = {};
        if (!todoTitle.trim()) newErrors.todoTitle = "제목을 입력해주세요.";
        if (!todoContent.trim()) newErrors.todoContent = "내용을 입력해주세요.";
        if (!priority) newErrors.priority = "우선순위를 선택해주세요.";
        if (!dueDate) newErrors.dueDate = "마감일을 선택해주세요.";
        // todoStatus는 기본값 있으므로 필수 아님 (원하면 추가 가능)

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // 폼 제출
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            alert("입력란을 확인해주세요.");
            return;
        }

        const todoData = {
            title: todoTitle,
            content: todoContent,
            priority,
            dueDate,
            status: todoStatus,
        };

        try {
            if (onSubmit) {
                // 부모에서 onSubmit 전달 시 사용 (더 유연함)
                await onSubmit(todoData, isEdit);
            } else {
                // 직접 API 호출 (기존 방식)
                if (isEdit) {
                    await apiService.updateTodo(initialData.id, todoData);
                    alert("할 일이 수정되었습니다.");
                } else {
                    await apiService.addTodo(todoData);
                    alert("할 일이 추가되었습니다.");
                }

                // 추가 모드일 때만 초기화
                if (!isEdit) {
                    setTodoTitle("");
                    setTodoContent("");
                    setPriority("중간");
                    setDueDate("");
                    setTodoStatus("대기중");
                }
            }
        } catch (error) {
            console.error(error);
            alert(isEdit ? "수정 중 오류가 발생했습니다." : "추가 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="todo-write-container">
            <form onSubmit={handleSubmit}>
                <input
                    className="todo-write-input"
                    type="text"
                    placeholder="제목을 입력하세요."
                    value={todoTitle}
                    onChange={(e) => setTodoTitle(e.target.value)}
                />
                {errors.todoTitle && <span className="error">{errors.todoTitle}</span>}

                <textarea
                    className="todo-write-input"
                    placeholder="내용을 입력하세요."
                    value={todoContent}
                    onChange={(e) => setTodoContent(e.target.value)}
                    rows="4"
                />
                {errors.todoContent && <span className="error">{errors.todoContent}</span>}

                <select
                    className="todo-write-input"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="">우선순위 선택</option>
                    <option value="높음">높음</option>
                    <option value="중간">중간</option>
                    <option value="낮음">낮음</option>
                </select>
                {errors.priority && <span className="error">{errors.priority}</span>}

                <input
                    className="todo-write-input"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                {errors.dueDate && <span className="error">{errors.dueDate}</span>}

                <select
                    className="todo-write-input"
                    value={todoStatus}
                    onChange={(e) => setTodoStatus(e.target.value)}
                >
                    <option value="대기중">대기중</option>
                    <option value="진행중">진행중</option>
                    <option value="완료">완료</option>
                </select>

                <button
                    type="submit"
                    className="write-button"
                    disabled={Object.keys(errors).length > 0}
                >
                    {isEdit ? "수정하기" : "추가하기"}
                </button>
            </form>
        </div>
    );
};

 */

const TodoForm = (onSubmit, initialData, isEdit) => {
    const [todoTitle, setTodoTitle] = useState("");
    const [todoContent, setTodoContent] = useState("");
    const [priority, setPriority] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [todoStatus, setTodoStatus] = useState("");
    const [isValidate, setIsValidate] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        validateForm();
        if(isValidate) {
            try {
                await apiService.addTodo(
                    todoTitle, todoContent, priority, dueDate, todoStatus);
                alert("할 일이 추가되었습니다.");
                setTodoTitle("");
                setTodoContent("");
                setPriority("");
                setDueDate("");
                setTodoStatus("");
            } catch (e) {
                alert("추가하는 과정에서 문제가 발생했습니다.");
            } finally {
                setIsValidate(false);
            }
        } else {
            alert("내용을 확인해주세요.");
        }
    }

    const validateForm = () => {
        if(todoTitle === "") setIsValidate(false);
        if(todoContent === "") setIsValidate(false);
        if(priority === "") setIsValidate(false);
        if(dueDate === "") setIsValidate(false);
        if(todoStatus === "") setIsValidate(false);
    }

    return(
        <>
            <div className="todo-write-container">
                <input
                    className="todo-write-input"
                    type="Text"
                    placeholder={"제목을 입력하세요."}
                    value={todoTitle}
                    onChange={(e) =>
                        setTodoTitle(e.target.value)}
                />
                {errors.todoTitle && <span className="error">{errors.todoTitle}</span>}
                <textarea
                    className="todo-write-input"
                    placeholder="내용을 입력하세요."
                    value={todoContent}
                    onChange={(e)=>
                        setTodoContent(e.target.value)}
                    rows="4"
                />
                <select
                    className="todo-write-input"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}>
                    <option value="">우선순위 선택</option>
                    <option value="important">중요</option>
                    <option value="standard">보통</option>
                    <option value="notHurry">별로</option>
                </select>

                <button className="write-button"
                        onClick={() => handleSubmit()}
                        disabled={isValidate}
                        style={isValidate ? {opacity:'0.7', cursor: 'not-allowed'} : {}}>
                    {isValidate ? '가입 중...' : '가입'}
                </button>
            </div>
        </>
    )
}