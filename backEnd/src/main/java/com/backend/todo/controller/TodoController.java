package com.backend.todo.controller;

import com.backend.todo.model.dto.Todo;
import com.backend.todo.model.service.TodoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/todo")
@RequiredArgsConstructor
class TodoController {
    private final TodoService todoService;
    private final SimpMessagingTemplate messagingTemplate;

    @GetMapping("/all")
    public List<Todo>  getAllTodos() {}

    @GetMapping("/{id}")
    public Todo getTodoDetail(@PathVariable int id) {}

    @GetMapping("/status/{status}")
    public List<Todo> getTodoByStatus(@PathVariable String status) {}

    @GetMapping("/priority/{priority}")
    public List<Todo> getTodosByPriority(@PathVariable String priority) {}

    @GetMapping("/statistics")
    public Map<String, Integer> getStatistics() {}

    /*
    createTodo 메서드 내부에서 messagingTemplate.convertAndSend("/topic/notifications", notification) 호출
     */
    @PostMapping()
    public void createTodo(@RequestBody Todo todo) {}

    @PutMapping("/{id}")
    public void updateTodo(@PathVariable int id,
                           @RequestBody Todo todo) {

    }

    @PatchMapping("/{id}/status")
    public void toggleStatus(@PathVariable int id,
                             @RequestBody Map<String, String> status){

    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable int id) {}


}
