package hanu.anthai.library_management.controller;

import hanu.anthai.library_management.entity.BorrowRecord;
import hanu.anthai.library_management.service.BorrowService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/borrow")
public class BorrowController {

    private final BorrowService borrowService;

    public BorrowController(BorrowService borrowService) {
        this.borrowService = borrowService;
    }

    @PostMapping("/borrow")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public void borrow(@RequestParam Long memberId,
                       @RequestParam Long bookId) {
        borrowService.borrowBook(memberId, bookId);
    }

    @PostMapping("/return")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public void returnBook(@RequestParam Long memberId,
                           @RequestParam Long bookId) {
        borrowService.returnBook(memberId, bookId);
    }

    @PostMapping("/extend")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public void extend(@RequestParam Long borrowId,
                       @RequestParam int extraDays) {
        borrowService.extendBorrow(borrowId, extraDays);
    }

    @GetMapping("/history/{memberId}")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public List<BorrowRecord> history(@PathVariable Long memberId) {
        return borrowService.getBorrowHistory(memberId);
    }

    // Thêm vào BorrowController.java
    @GetMapping("/active")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public List<BorrowRecord> getActive() {
        return borrowService.getAllActive();
    }

}

