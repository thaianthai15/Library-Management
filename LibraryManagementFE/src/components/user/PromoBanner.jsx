import Button from "./Button";
import GirlImg from "../../assets/promo_girl.png"; // Bạn thay bằng ảnh thật

export default function PromoBanner() {
  return (
    <div className="max-w-7xl mx-auto px-6 mb-16">
      <div className="bg-[#d0e1e7] rounded-3xl p-12 flex items-center justify-between overflow-hidden relative min-h-[300px]">
        <div className="z-10 max-w-lg">
          <h2 className="text-4xl font-bold text-[--primary-color] leading-tight mb-6">
            Get 25% Discount In All Kind Of Super Selling
          </h2>
          <Button variant="primary" className="px-10">Shop Now →</Button>
        </div>
        <img 
          src={GirlImg} 
          alt="promo" 
          className="absolute right-10 bottom-0 h-[110%] object-contain"
        />
      </div>
    </div>
  );
}