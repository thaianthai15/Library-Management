package hanu.anthai.library_management.service;

import hanu.anthai.library_management.entity.Book;
import hanu.anthai.library_management.entity.BookStatus;
import hanu.anthai.library_management.entity.BorrowRecord;
import hanu.anthai.library_management.entity.Member;
import hanu.anthai.library_management.repository.BookRepository;
import hanu.anthai.library_management.repository.BorrowRecordRepository;
import hanu.anthai.library_management.repository.MemberRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class BorrowService {

    private final BorrowRecordRepository borrowRepo;
    private final BookRepository bookRepo;
    private final MemberRepository memberRepo;

    public BorrowService(BorrowRecordRepository borrowRepo,
                         BookRepository bookRepo,
                         MemberRepository memberRepo) {
        this.borrowRepo = borrowRepo;
        this.bookRepo = bookRepo;
        this.memberRepo = memberRepo;
    }
    @Transactional
    public void borrowBook(Long memberId, Long bookId) {

        Member member = memberRepo.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        Book book = bookRepo.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        if (book.getQuantity() <= 0) {
            throw new RuntimeException("Book out of stock");
        }

        long currentBorrow = borrowRepo.countByMemberAndReturnedFalse(member);
        if (currentBorrow >= 3) {
            throw new RuntimeException("Member already borrowed 3 books");
        }

        BorrowRecord record = new BorrowRecord();
        record.setMember(member);
        record.setBook(book);
        record.setBorrowDate(LocalDate.now());
        record.setDueDate(LocalDate.now().plusDays(14));
        record.setReturned(false);

        book.setQuantity(book.getQuantity() - 1);

        if (book.getQuantity() == 0) {
            book.setStatus(BookStatus.BORROWED);
        }

        borrowRepo.save(record);
        bookRepo.save(book);
    }
    @Transactional
    public void returnBook(Long memberId, Long bookId) {

        Member member = memberRepo.findById(memberId).orElseThrow();
        Book book = bookRepo.findById(bookId).orElseThrow();

        BorrowRecord record = borrowRepo
                .findByMemberAndBookAndReturnedFalse(member, book)
                .orElseThrow(() -> new RuntimeException("No active borrow record"));

        record.setReturned(true);
        record.setReturnDate(LocalDate.now());

        long lateDays = ChronoUnit.DAYS.between(
                record.getDueDate(),
                record.getReturnDate()
        );

        if (lateDays > 0) {
            record.setFine(lateDays * 5000);
        }

        book.setQuantity(book.getQuantity() + 1);
        book.updateStatus();

        borrowRepo.save(record);
        bookRepo.save(book);
    }

    @Transactional
    public void extendBorrow(Long borrowId, int extraDays) {

        BorrowRecord borrow = borrowRepo.findById(borrowId)
                .orElseThrow(() -> new RuntimeException("Borrow not found"));

        if (borrow.getReturnDate() != null)
            throw new RuntimeException("Book already returned");

        if (borrow.getDueDate().isBefore(LocalDate.now()))
            throw new RuntimeException("Borrow already overdue");

        if (extraDays > 30)
            throw new RuntimeException("Max extend is 30 days");

        borrow.setDueDate(borrow.getDueDate().plusDays(extraDays));
    }

    public List<BorrowRecord> getBorrowHistory(Long memberId) {
        return borrowRepo.findByMemberId(memberId);
    }

    public List<BorrowRecord> getAllActive() {
        return borrowRepo.findByReturnedFalse();
    }

}

