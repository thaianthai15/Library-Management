package hanu.anthai.library_management.service;

import hanu.anthai.library_management.entity.Book;
import hanu.anthai.library_management.entity.Member;
import hanu.anthai.library_management.repository.BookRepository;
import hanu.anthai.library_management.repository.BorrowRecordRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {

    private final BookRepository bookRepo;
    private final BorrowRecordRepository borrowRepo;

    public ReportService(BookRepository bookRepo,
                         BorrowRecordRepository borrowRepo) {
        this.bookRepo = bookRepo;
        this.borrowRepo = borrowRepo;
    }

    public List<Book> getOutOfStockBooks() {
        return bookRepo.findByQuantity(0);
    }
    public long getBorrowCountByMonth(int month, int year) {
        return borrowRepo.countBorrowByMonth(month, year);
    }
    public List<Member> getLateMembers() {
        return borrowRepo.findLateMembers();
    }

}

