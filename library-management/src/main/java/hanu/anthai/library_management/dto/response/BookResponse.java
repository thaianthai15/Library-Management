package hanu.anthai.library_management.dto.response;
import hanu.anthai.library_management.entity.BookStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookResponse {

    private Long id;
    private String title;
    private String author;
    private String isbn;
    private String category;
    private int quantity;
    private LocalDate publishedDate;
    private BookStatus status;
}
