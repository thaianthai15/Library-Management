package hanu.anthai.library_management.repository;

import hanu.anthai.library_management.entity.Book;
import hanu.anthai.library_management.entity.BorrowRecord;
import hanu.anthai.library_management.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BorrowRecordRepository extends JpaRepository<BorrowRecord, Long> {

    long countByMemberAndReturnedFalse(Member member);

    List<BorrowRecord> findByMemberId(Long memberId);

    Optional<BorrowRecord> findByMemberAndBookAndReturnedFalse(Member member, Book book);

    @Query("SELECT COUNT(b) FROM BorrowRecord b WHERE MONTH(b.borrowDate) = :month AND YEAR(b.borrowDate) = :year")
    long countBorrowByMonth(@Param("month") int month, @Param("year") int year);

    @Query("SELECT DISTINCT b.member FROM BorrowRecord b WHERE b.returned = false AND b.dueDate < CURRENT_DATE")
    List<Member> findLateMembers();

    List<BorrowRecord> findByReturnedFalse();
}

