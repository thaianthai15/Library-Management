import { FaStar } from "react-icons/fa";
import Button from "./Button";
import Book1 from '../../assets/book_1.png';
import Book2 from '../../assets/book_2.png';
const ratingBooks = [
    { title: "Simple Things You To Save BOOK", price: 30.00, author: "Wilson", rating: 4 },
    { title: "How Deal With Very Bad BOOK", price: 29.00, author: "Wilson", rating: 4 },
    { title: "Qple GPad With Retina Display", price: 30.00, author: "Wilson", rating: 4 },
    { title: "Flovely And Unicorn Erna", price: 19.00, author: "Wilson", rating: 4 },
];

export default function RatingSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-bold text-[--primary-color]">Top Rating Books</h2>
        <Button variant="outline" className="text-sm px-4 py-2">View More →</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ratingBooks.map((book, i) => (
          <div key={i} className="flex gap-4 p-4 border rounded-xl hover:shadow-lg transition-shadow bg-white">
            <div className="w-24 h-32 bg-gray-100 rounded overflow-hidden">
                <img src={Book1} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs text-gray-400">Design Low Book</span>
                <h4 className="font-bold text-[--primary-color] text-sm mt-1">{book.title}</h4>
                <div className="flex text-orange-400 text-[10px] mt-1">
                    {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                </div>
                <p className="text-[--highlight-color] font-bold mt-2">${book.price.toFixed(2)}</p>
              </div>
              <Button variant="light" className="!py-1 !px-4 text-xs w-fit">Add To Cart</Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}