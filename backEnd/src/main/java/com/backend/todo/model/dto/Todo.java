package com.backend.todo.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Todo {
    private int todoNo;
    private String todoTitle;
    private String todoContent;
    private String todoStatus;  // (PENDING, IN_PROGRESS, COMPLETED)
    private String priority;    // (LOW, MEDIUM, HIGH)
    private String dueDate;
    private String createdAt;
    private String updatedAt;
}
