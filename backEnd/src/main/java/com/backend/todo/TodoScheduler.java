package com.backend.todo;

import com.backend.todo.model.dto.Todo;
import com.backend.todo.model.mapper.TodoMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class TodoScheduler {

    private final TodoMapper todoMapper;
    private final SimpMessagingTemplate messagingTemplate;

    /*
    매일 오전 9시 마감임박 알림
    cron = "0 0 9 * * *"
    형식으로 작성하는 것은 Spring 에서 권장되지 않는다.
    -> 일과 요일은 동시에 특정 값 지정 불가능하기 때문에
    cron = "0 0 9 * * ?"
    cron = "0 0 9 * ? *"
    형식으로 작성하도록 한다.
     */
    @Scheduled(cron = "0 0 9 * * ?")
    public void checkUpcomingTodos() {
        log.info("마감임박 Todo 체크 시작");
        List<Todo> upcomingTodos = todoMapper.selectUpcomingTodos();

        if (!upcomingTodos.isEmpty()) {
            log.info("마감임박 Todo {}건 발견", upcomingTodos.size());

            for (Todo todo : upcomingTodos) {
                Map<String, String> notification = new HashMap<>();
                notification.put("type", "DUE_DATE_ALERT");
                notification.put("message", "마감 임박: " + todo.getTodoTitle());
                notification.put("dueDate", todo.getDueDate());
                notification.put("priority", todo.getPriority());
                messagingTemplate.convertAndSend("/topic/notifications", notification);
            }
        }
        log.info("마감임박 Todo 체크 완료");
    }
}