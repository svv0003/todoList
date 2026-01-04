package com.backend.todo.controller;

import com.backend.todo.model.dto.Todo;
import com.backend.todo.model.service.TodoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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
    public ResponseEntity<List<Todo>> getAllTodos() {
        log.info("=====전체 Todo 조회=====");
        try {
            List<Todo> res = todoService.getAllTodos();
            log.info("조회 성공 {}", res);
            return ResponseEntity.ok(res);
        } catch (Exception e){
            log.error("조회 실패 : {}", e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoDetail(@PathVariable int id) {
        log.info("=====특정 Todo 조회=====");
        try {
            Todo res = todoService.getTodoByNo(id);
            log.info("조회 성공 {}", res);
            return ResponseEntity.ok(res);
        } catch (Exception e){
            log.error("조회 실패 : {}", e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Todo>> getTodoByStatus(@PathVariable String status) {
        log.info("=====상태별 Todo 조회=====");
        try {
            List<Todo> res = todoService.getTodosByStatus(status);
            log.info("조회 성공 {}", res);
            return ResponseEntity.ok(res);
        } catch (Exception e){
            log.error("조회 실패 : {}", e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/priority/{priority}")
    public ResponseEntity<List<Todo>> getTodosByPriority(@PathVariable String priority) {
        log.info("=====우선순위별 Todo 조회=====");
        try {
            List<Todo> res = todoService.getTodosByPriority(priority);
            log.info("조회 성공 {}", res);
            return ResponseEntity.ok(res);
        } catch (Exception e){
            log.error("조회 실패 : {}", e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Integer>> getStatistics() {
        log.info("=====  =====");
        try {
            Map<String, Integer> res = todoService.getStatistics();
            log.info(" 성공");
            return ResponseEntity.ok(res);
        } catch (Exception e){
            log.error(" 실패 : {}", e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    /*
    createTodo 메서드 내부에서 messagingTemplate.convertAndSend("/topic/notifications", notification) 호출
     */
    @PostMapping()
    public void createTodo(@RequestBody Todo todo) {
        log.info("=====Todo 추가=====");
        try {
            todoService.createTodo(todo);
            log.info("추가 성공 : {}", todo.getTodoNo());

            Map<String, String> notification = new HashMap<>();
            notification.put("type", "TODO_CREATED");
            notification.put("message", "새로운 할 일이 등록되었습니다: " + todo.getTodoTitle());
            notification.put("priority", todo.getPriority());
            messagingTemplate.convertAndSend("/topic/notifications", notification);
        } catch (Exception e){
            log.error("추가 실패 : {}", e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public void updateTodo(@PathVariable int id,
                           @RequestBody Todo todo) {
        log.info("=====Todo 수정=====");
        try {
            todo.setTodoNo(id);
            todoService.updateTodo(todo);
            log.info("수정 성공 {}", todo.getTodoNo());
        } catch (Exception e){
            log.error("수정 실패 : {}", e.getMessage());
        }
    }

    @PatchMapping("/{id}/status")
    public void toggleStatus(@PathVariable int id,
                             @RequestBody Map<String, String> status){
        log.info("=====Todo 상태 변경?=====");
        try {
            String newStatus = status.get("status");
            todoService.toggleTodoStatus(id, newStatus);
            log.info("상태 변경 성공 {}", id);
        } catch (Exception e){
            log.error("상태 변경 실패 : {}", e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable int id) {
        log.info("=====Todo 삭제=====");
        try {
            todoService.deleteTodo(id);
            log.info("삭제 성공 {}", id);
        } catch (Exception e){
            log.error("삭제 실패 : {}", e.getMessage());
        }
    }


}
