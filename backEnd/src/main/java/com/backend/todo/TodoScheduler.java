package com.backend.todo;

import com.backend.todo.model.mapper.TodoMapper;
import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.messaging.handler.annotation.MessageMapping;



@Slf4j
@Component
@RequiredArgsConstructor
public class TodoScheduler {

    private final TodoMapper todoMapper;
    private final SimpMessagingTemplate messagingTemplate;

    /*
    checkUpcomingTodos	@Scheduled(cron = "0 0 9 * * ?")	void	매일 오전 9시 마감임박 알림
     */
    @Scheduled(cron = "0 0 9 * * ?")
    public void checkUpcomingTodos() {

    }
}
