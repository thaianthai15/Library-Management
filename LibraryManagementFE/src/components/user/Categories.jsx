import BookCard from "./BookCard";
import Button from "./Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { FaArrowRight } from "react-icons/fa";
import Book1 from "../../assets/book_1.png";
import Book2 from "../../assets/book_2.png";

const booksData = [
  {
    id: 1,
    title: "The Hidden Mystery Behind",
    category: "Design Low Book",
    price: 29.0,
    image: Book1,
    author: { name: "Hawkins", img: "avatar_1" },
    rating: 4,
    badges: [],
  },
  {
    id: 2,
    title: "Qple GPad With Retina Sisplay",
    category: "Design Low Book",
    price: 19.0,
    image: Book2,
    author: { name: "Albert", img: "avatar_2" },
    rating: 4,
    badges: [{ label: "-12%", type: "discount" }],
  },
  {
    id: 3,
    title: "Qple GPad With Retina Sisplay",
    category: "Design Low Book",
    price: 19.0,
    image: Book2,
    author: { name: "Albert", img: "avatar_2" },
    rating: 4,
    badges: [{ label: "-12%", type: "discount" }],
  },
  {
    id: 4,
    title: "Qple GPad With Retina Sisplay",
    category: "Design Low Book",
    price: 19.0,
    image: Book2,
    author: { name: "Albert", img: "avatar_2" },
    rating: 4,
    badges: [{ label: "-12%", type: "discount" }],
  },
  {
    id: 5,
    title: "Qple GPad With Retina Sisplay",
    category: "Design Low Book",
    price: 19.0,
    image: Book2,
    author: { name: "Albert", img: "avatar_2" },
    rating: 4,
    badges: [{ label: "-12%", type: "discount" }],
  },
  {
    id: 6,
    title: "Qple GPad With Retina Sisplay",
    category: "Design Low Book",
    price: 19.0,
    image: Book2,
    author: { name: "Albert", img: "avatar_2" },
    rating: 4,
    badges: [{ label: "-12%", type: "discount" }],
  },
  {
    id: 7,
    title: "Qple GPad With Retina Sisplay",
    category: "Design Low Book",
    price: 19.0,
    image: Book2,
    author: { name: "Albert", img: "avatar_2" },
    rating: 4,
    badges: [{ label: "-12%", type: "discount" }],
  },
];

export default function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-bold text-[--primary--color]">
          Featured Books
        </h2>
        <Button
          variant="outline"
          iconRight={FaArrowRight}
          className="border-gray-300"
        >
          Explore More
        </Button>
      </div>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={24}
        slidesPerView={5}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        speed={1000}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        className="mySwiper"
      >
        {booksData.map((book) => (
          <SwiperSlide key={book.id}>
            <BookCard book={book} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
