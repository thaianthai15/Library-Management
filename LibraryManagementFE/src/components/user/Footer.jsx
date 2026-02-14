import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn, FaPaperPlane } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[--primary-color] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-gray-700 mb-12">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-gray-500 flex items-center justify-center text-xl">📞</div>
            <div><p className="text-xs text-gray-400">Call Us 7/24</p><p className="font-bold">+208-555-0112</p></div>
        </div>
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-gray-500 flex items-center justify-center text-xl">✉️</div>
            <div><p className="text-xs text-gray-400">Make a Quote</p><p className="font-bold">example@gmail.com</p></div>
        </div>
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-gray-500 flex items-center justify-center text-xl">⏰</div>
            <div><p className="text-xs text-gray-400">Opening Hour</p><p className="font-bold">Sun - Fri: 9am - 6pm</p></div>
        </div>
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-gray-500 flex items-center justify-center text-xl">📍</div>
            <div><p className="text-xs text-gray-400">Location</p><p className="font-bold">4517 Washington ave.</p></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1">
          <div className="flex items-center gap-2 text-2xl font-bold mb-6">
            <div className="w-8 h-8 bg-[--highlight-color] rounded-full"></div> Bookle
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">Phasellus ultricies aliquam volutpat ullamcorper laoreet neque, a lacinia curabitur lacinia mollis.</p>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center hover:bg-[--highlight-color] cursor-pointer transition-colors"><FaFacebookF /></div>
            <div className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center hover:bg-[--highlight-color] cursor-pointer transition-colors"><FaTwitter /></div>
            <div className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center hover:bg-[--highlight-color] cursor-pointer transition-colors"><FaYoutube /></div>
            <div className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center hover:bg-[--highlight-color] cursor-pointer transition-colors"><FaLinkedinIn /></div>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-lg border-b-2 border-[--highlight-color] w-fit">Customer Support</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer">» Store List</li>
            <li className="hover:text-white cursor-pointer">» Opening Hours</li>
            <li className="hover:text-white cursor-pointer">» Contact Us</li>
            <li className="hover:text-white cursor-pointer">» Return Policy</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-lg border-b-2 border-[--highlight-color] w-fit">Categories</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer">» Novel Books</li>
            <li className="hover:text-white cursor-pointer">» Poetry Books</li>
            <li className="hover:text-white cursor-pointer">» Political Books</li>
            <li className="hover:text-white cursor-pointer">» History Books</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-lg border-b-2 border-[--highlight-color] w-fit">Newsletter</h4>
          <p className="text-gray-400 text-sm mb-6">Sign up to searing weekly newsletter to get the latest updates.</p>
          <div className="relative">
            <input type="email" placeholder="Enter Email Address" className="w-full bg-[#036280] rounded-full py-3 px-6 text-sm focus:outline-none" />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[--highlight-color] p-2 rounded-full"><FaPaperPlane /></button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-700 flex justify-between items-center text-xs text-gray-500">
        <p>© All Copyright 2024 by Bookle</p>
        <div className="flex gap-4 opacity-50">
            <span>VISA</span> <span>MasterCard</span> <span>Paypal</span>
        </div>
      </div>
    </footer>
  );
}