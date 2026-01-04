package com.backend.todo.model.service;

import com.backend.todo.model.dto.Todo;
import com.backend.todo.model.mapper.TodoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService {

    private final TodoMapper todoMapper;

    @Override
    public List<Todo> getAllTodos() {
        return todoMapper.selectAllTodos();
    }

    @Override
    public Todo getTodoByNo(int todoNo) {
        return todoMapper.selectTodoByNo(todoNo);
    }

    @Override
    public List<Todo> getTodosByStatus(String status) {
        return todoMapper.selectTodosByStatus(status);
    }

    @Override
    public List<Todo> getTodosByPriority(String priority) {
        return todoMapper.selectTodosByPriority(priority);
    }

    @Override
    @Transactional
    public void createTodo(Todo todo) {
        todoMapper.insertTodo(todo);
    }

    @Override
    @Transactional
    public void updateTodo(Todo todo) {
        todoMapper.updateTodo(todo);
    }

    @Override
    @Transactional
    public void toggleTodoStatus(int todoNo, String status) {
        todoMapper.updateTodoStatus(todoNo, status);
    }

    @Override
    @Transactional
    public void deleteTodo(int todoNo) {
        todoMapper.deleteTodo(todoNo);
    }

    @Override
    public Map<String, Integer> getStatistics() {
        Map<String, Integer> statistics = new HashMap<>();

        int pending = todoMapper.countByStatus("PENDING");
        int inProgress = todoMapper.countByStatus("IN_PROGRESS");
        int completed = todoMapper.countByStatus("COMPLETED");
        int total = pending + inProgress + completed;

        statistics.put("total", total);
        statistics.put("pending", pending);
        statistics.put("inProgress", inProgress);
        statistics.put("completed", completed);

        // 완료율 계산
        int completionRate = total > 0 ? (completed * 100) / total : 0;
        statistics.put("completionRate", completionRate);

        return statistics;
    }
}