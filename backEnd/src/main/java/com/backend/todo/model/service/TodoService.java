package com.backend.todo.model.service;

import com.backend.todo.model.dto.Todo;

import java.util.List;
import java.util.Map;

public interface TodoService {

    List<Todo> getAllTodos();
    Todo getTodoByNo(int todoNo);
    List<Todo> getTodosByStatus(String status);
    List<Todo> getTodosByPriority(String priority);
    void createTodo(Todo todo);
    void updateTodo(Todo todo);
    void toggleTodoStatus(int todoNo, String status);
    void deleteTodo(int todoNo);
    Map<String, Integer> getStatistics();
}
