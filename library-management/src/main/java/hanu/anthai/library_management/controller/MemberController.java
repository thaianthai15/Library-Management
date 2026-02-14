package hanu.anthai.library_management.controller;

import hanu.anthai.library_management.entity.Member;
import hanu.anthai.library_management.service.MemberService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Member create(@RequestBody Member member) {
        return memberService.createMember(member);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public List<Member> getAll() {
        return memberService.getAllMembers();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id) {
        memberService.deleteMember(id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Member update(@PathVariable Long id, @RequestBody Member member) {
        return memberService.updateMember(id, member);
    }
}

