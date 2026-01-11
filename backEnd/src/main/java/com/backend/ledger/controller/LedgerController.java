package com.backend.ledger.controller;

import com.backend.ledger.model.dto.Ledger;
import com.backend.ledger.model.dto.LedgerFilter;
import com.backend.ledger.model.service.LedgerService;
import com.backend.todo.model.dto.Todo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/ledger")
@RequiredArgsConstructor
public class LedgerController {

    private final LedgerService ledgerService;
    private final SimpMessagingTemplate messagingTemplate;

    @GetMapping("/all")
    public ResponseEntity<List<Ledger>> getAllLedgersByFilter(
            @ModelAttribute LedgerFilter filter) {
        log.info("=====전체 Todo 조회=====");
        try {
            List<Ledger> res = ledgerService.getAllLedgersByFilter(filter);
            log.info("조회 성공 {}", res);
            return ResponseEntity.ok(res);
        } catch (Exception e){
            log.error("조회 실패 : {}", e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/{ledgerId}")
    public ResponseEntity<Ledger> getTodoDetail(@PathVariable int ledgerId) {
        log.info("=====특정 Todo 조회=====");
        try {
            Ledger res = ledgerService.getLedgerById(ledgerId);
            log.info("조회 성공 {}", res);
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            log.error("조회 실패 : {}", e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping()
    public void createLedger(@RequestBody Ledger ledger) {
        log.info("=====Ledger 추가=====");
        try {
            ledgerService.createLedger(ledger);
            log.info("추가 성공 : {}", ledger.getLedgerId());

            Map<String, String> notification = new HashMap<>();
            notification.put("type", "LEDGER_CREATED");
            notification.put("message", "새로운 내역이 등록되었습니다: ");
            messagingTemplate.convertAndSend("/topic/notifications", notification);
        } catch (Exception e){
            log.error("추가 실패 : {}", e.getMessage());
        }
    }

    @PutMapping("/{ledgerId}")
    public void updateLedger(@RequestBody Ledger ledger,
                             @PathVariable int ledgerId) {
        log.info("=====Ledger 수정=====");
        try {
            ledger.setLedgerId(ledgerId);
            ledgerService.updateLedger(ledger);
            log.info("수정 성공 : {}", ledger.getLedgerId());
        } catch (Exception e){
            log.error("수정 실패 : {}", e.getMessage());
        }
    }

    @DeleteMapping("/{ledgerId}")
    public void updateLedger(@PathVariable int ledgerId) {
        log.info("=====Ledger 삭제=====");
        try {
            ledgerService.deleteLedger(ledgerId);
            log.info("삭제 성공 : {}", ledgerId);
        } catch (Exception e){
            log.error("삭제 실패 : {}", e.getMessage());
        }
    }
}
