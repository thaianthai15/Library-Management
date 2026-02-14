import Banner from "../../assets/hero.png";
import Button from "./Button";
import { FaArrowRight } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      <img src={Banner} alt="Banner" className="w-full h-auto min-h-[300px] object-cover" />

      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6">
          
          <div className="mt-40 ml-28">
            <Button 
              variant="primary" 
              iconRight={FaArrowRight}
              className="px-10 py-4 shadow-lg" 
            >
              Shop Now
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}