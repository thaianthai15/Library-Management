package hanu.anthai.library_management.service;

import hanu.anthai.library_management.entity.Member;
import hanu.anthai.library_management.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberService {

    private final MemberRepository memberRepo;

    public MemberService(MemberRepository memberRepo) {
        this.memberRepo = memberRepo;
    }

    public Member createMember(Member member) {
        if (memberRepo.existsByMemberCode(member.getMemberCode())) {
            throw new RuntimeException("Member code already exists");
        }
        return memberRepo.save(member);
    }

    public List<Member> getAllMembers() {
        return memberRepo.findAll();
    }

    public Member getByCode(String code) {
        return memberRepo.findByMemberCode(code)
                .orElseThrow(() -> new RuntimeException("Member not found"));
    }

    public void deleteMember(Long id) {
        memberRepo.deleteById(id);
    }

    public Member updateMember(Long id, Member updatedMember) {
        Member member = memberRepo.findById(id).orElseThrow();
        member.setName(updatedMember.getName());
        member.setEmail(updatedMember.getEmail());
        member.setPhone(updatedMember.getPhone());
        return memberRepo.save(member);
    }
}

