package hanu.anthai.library_management.repository;

import hanu.anthai.library_management.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByMemberCode(String memberCode);

    boolean existsByMemberCode(String memberCode);

    List<Member> findByNameContainingIgnoreCaseOrMemberCodeContainingIgnoreCase(String name, String code);

}


