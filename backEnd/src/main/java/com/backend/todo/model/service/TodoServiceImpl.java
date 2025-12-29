package com.backend.todo.model.service;

import com.backend.todo.model.dto.Todo;
import com.backend.todo.model.mapper.TodoMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/*
Transactional 어노테이션은 CUD(생성/수정/삭제) 작업에만 추가
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService {
    private final TodoMapper todoMapper;


    @Override
    public List<Todo> getAllTodos() {
        return List.of();
    }

    @Override
    public Todo getTodoByNo(int todoNo) {
        return null;
    }

    @Override
    public List<Todo> getTodosByStatus(String status) {
        return List.of();
    }

    @Override
    public List<Todo> getTodosByPriority(String priority) {
        return List.of();
    }

    @Override
    @Transactional
    public void createTodo(Todo todo) {

    }

    @Override
    @Transactional
    public void updateTodo(Todo todo) {

    }

    @Override
    @Transactional
    public void toggleTodoStatus(int todoNo, String status) {

    }

    @Override
    @Transactional
    public void deleteTodo(int todoNo) {

    }

    @Override
    public Map<String, Integer> getStatistics() {
        return Map.of();
    }
}
