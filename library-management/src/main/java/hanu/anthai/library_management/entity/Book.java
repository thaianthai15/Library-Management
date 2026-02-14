package hanu.anthai.library_management.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "books", uniqueConstraints = {
        @UniqueConstraint(columnNames = "isbn")})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;

    @Column(unique = true)
    private String isbn;

    private String category;
    private int quantity;
    private LocalDate publishDate;

    @Enumerated(EnumType.STRING)
    private BookStatus status;

    public void updateStatus() {
        if (quantity <= 0) {
            this.status = BookStatus.OUT_OF_STOCK;
        } else {
            this.status = BookStatus.AVAILABLE;
        }
    }
}

