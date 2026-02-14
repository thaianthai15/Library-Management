import { FaStar, FaRegStar, FaHeart, FaEye, FaExchangeAlt, FaShoppingBasket } from "react-icons/fa";
import Button from "./Button";

export default function BookCard({ book }) {
  const { title, category, price, oldPrice, image, author, rating, badges } = book;

  return (
    <div className="flex flex-col"> 
      
      <div className="group relative bg-gray-100 rounded-xl p-8 flex items-center justify-center overflow-hidden min-h-[300px] cursor-pointer">
        <img 
          src={image} 
          alt={title} 
          className="max-h-52 object-contain group-hover:scale-105 transition-transform duration-500" 
        />
        
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {badges?.map((badge, idx) => (
            <span key={idx} className={`${badge.type === 'discount' ? 'bg-[--highlight-color]' : 'bg-[--primary--color]'} text-white text-xs font-bold px-3 py-1 rounded`}>
              {badge.label}
            </span>
          ))}
        </div>

        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
          <button className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-gray-400 hover:text-[--highlight-color] transition-colors"><FaHeart /></button>
          <button className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-gray-400 hover:text-[--highlight-color] transition-colors"><FaExchangeAlt /></button>
          <button className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-gray-400 hover:text-[--highlight-color] transition-colors"><FaEye /></button>
        </div>
      </div>

      <div className="py-4 flex flex-col gap-1">
        <span className="text-gray-400 text-xs font-medium">{category}</span>
        <h3 className="text-[--primary--color] font-bold text-base line-clamp-2 h-12 hover:text-[--highlight-color] transition-colors cursor-pointer">
          {title}
        </h3>
        
        <div className="flex items-center gap-2">
          <span className="text-[--highlight-color] font-bold">${price.toFixed(2)}</span>
          {oldPrice && <span className="text-gray-400 line-through text-sm">${oldPrice.toFixed(2)}</span>}
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <img src={author.img} className="w-6 h-6 rounded-full object-cover" alt={author.name} />
            <span className="text-gray-500 text-xs">{author.name}</span>
          </div>
          <div className="flex text-orange-400 text-[10px]">
            {[...Array(5)].map((_, i) => (
              i < rating ? <FaStar key={i} /> : <FaRegStar key={i} className="text-gray-300" />
            ))}
          </div>
        </div>

        <div className="mt-4">
          <Button 
            variant="light" 
            iconLeft={FaShoppingBasket} 
            className="w-full text-sm py-2 !rounded-full"
          >
            Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
}