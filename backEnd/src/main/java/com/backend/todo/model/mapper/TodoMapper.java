package com.backend.todo.model.mapper;

import com.backend.todo.model.dto.Todo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TodoMapper {

    /**
     * 전체 Todo 조회
     * @return
     */
    List<Todo> selectAllTodos();

    /**
     * 특정 Todo 조회
     * @param todoNo
     * @return
     */
    Todo selectTodoByNo(int todoNo);

    /**
     * 상태별 Todo 조회
     * @param status
     * @return
     */
    List<Todo> selectTodosByStatus(String status);

    /**
     * 우선순위별 조회
     * @param priority
     * @return
     */
    List<Todo> selectTodosByPriority(String priority);

    /**
     * Todo 생성
     * @param todo
     * @return
     */
    int insertTodo(Todo todo);

    /**
     * Todo 수정
     * @param todo
     * @return
     */
    int updateTodo(Todo todo);

    /**
     * 상태 변경
     * @param todoNo
     * @param status
     * @return
     */
    int updateTodoStatus(int todoNo, String status);

    /**
     * Todo 삭제
     * @param todoNo
     * @return
     */
    int deleteTodo(int todoNo);

    /**
     * 마감임박 Todo
     * @return
     */
    List<Todo> selectUpcomingTodos();

    /**
     * 상태별 개수
     * @param status
     * @return
     */
    int countByStatus(String status);
}
