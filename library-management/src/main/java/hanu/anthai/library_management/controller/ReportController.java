package hanu.anthai.library_management.controller;

import hanu.anthai.library_management.entity.Book;
import hanu.anthai.library_management.entity.Member;
import hanu.anthai.library_management.service.ReportService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@PreAuthorize("hasAnyRole('ADMIN','STAFF')")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/out-of-stock")
    public List<Book> outOfStock() {
        return reportService.getOutOfStockBooks();
    }

    @GetMapping("/borrow-stat")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public long borrowStat(@RequestParam int month,
                           @RequestParam int year) {
        return reportService.getBorrowCountByMonth(month, year);
    }
    @GetMapping("/late-members")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public List<Member> lateMembers() {
        return reportService.getLateMembers();
    }

}

