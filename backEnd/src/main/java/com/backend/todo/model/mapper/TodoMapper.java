package com.backend.todo.model.mapper;

import com.backend.todo.model.dto.Todo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TodoMapper {

    // 전체 Todo 조회
    List<Todo> selectAllTodos();

    // 특정 Todo 조회
    Todo selectTodoByNo(int todoNo);

    // 상태별 Todo 조회
    List<Todo> selectTodosByStatus(String status);

    // 우선순위별 조회
    List<Todo> selectTodosByPriority(String priority);

    // Todo 생성
    int insertTodo(Todo todo);

    // Todo 수정
    int updateTodo(Todo todo);

    // 상태만 변경
    int updateTodoStatus(int todoNo, String status);

    // Todo 삭제
    int deleteTodo(int todoNo);

    // 마감임박 Todo
    List<Todo> selectUpcomingTodos();

    // 상태별 개수
    int countByStatus(String status);

}
