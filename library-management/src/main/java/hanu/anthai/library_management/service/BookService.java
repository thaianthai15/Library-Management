package hanu.anthai.library_management.service;

import hanu.anthai.library_management.dto.response.BookResponse;
import hanu.anthai.library_management.entity.Book;
import hanu.anthai.library_management.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public Book addBook(Book book) {
        if (book.getQuantity() < 0) {
            throw new RuntimeException("Quantity cannot be negative");
        }

        if (bookRepository.findByIsbn(book.getIsbn()).isPresent()) {
            throw new RuntimeException("ISBN already exists");
        }

        book.updateStatus();
        return bookRepository.save(book);
    }

    public Book updateBook(Long id, Book updatedBook) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        book.setTitle(updatedBook.getTitle());
        book.setAuthor(updatedBook.getAuthor());
        book.setCategory(updatedBook.getCategory());
        book.setQuantity(updatedBook.getQuantity());
        book.setPublishDate(updatedBook.getPublishDate());

        book.updateStatus();
        return bookRepository.save(book);
    }

    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new RuntimeException("Book not found");
        }
        bookRepository.deleteById(id);
    }

    public List<BookResponse> getAllBooks() {
        return bookRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<BookResponse> searchBooks(String keyword) {
        return bookRepository
                .findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCaseOrIsbnContaining(
                        keyword, keyword, keyword
                )
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private BookResponse mapToResponse(Book book) {
        BookResponse res = new BookResponse();
        res.setId(book.getId());
        res.setTitle(book.getTitle());
        res.setAuthor(book.getAuthor());
        res.setIsbn(book.getIsbn());
        res.setCategory(book.getCategory());
        res.setQuantity(book.getQuantity());
        res.setPublishedDate(book.getPublishDate());
        res.setStatus(book.getStatus());
        return res;
    }
}
