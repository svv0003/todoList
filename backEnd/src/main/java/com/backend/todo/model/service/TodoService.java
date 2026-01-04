package com.backend.todo.model.service;

import com.backend.todo.model.dto.Todo;

import java.util.List;
import java.util.Map;

public interface TodoService {

    // 전체 Todo 조회
    List<Todo> getAllTodos();

    // 특정 Todo 조회
    Todo getTodoByNo(int todoNo);

    // 상태별 Todo 조회
    List<Todo> getTodosByStatus(String status);

    // 우선순위별 조회
    List<Todo> getTodosByPriority(String priority);

    // Todo 생성
    void createTodo(Todo todo);

    // Todo 수정
    void updateTodo(Todo todo);

    // 상태 토글
    void toggleTodoStatus(int todoNo, String status);

    // Todo 삭제
    void deleteTodo(int todoNo);

    // 통계 조회
    Map<String, Integer> getStatistics();
}
