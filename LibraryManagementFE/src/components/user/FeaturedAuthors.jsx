const authors = [
  { name: "Kawser Ahmed", books: "02 Published Books" },
  { name: "Brooklyn Simmons", books: "15 Published Books" },
  { name: "Leslie Alexander", books: "08 Published Books" },
  { name: "Guy Hawkins", books: "12 Published Books" },
  { name: "Esther Howard", books: "10 Published Books" },
];

export default function FeaturedAuthors() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 text-center">
      <h2 className="text-3xl font-bold text-[--primary-color] mb-2">Featured Author</h2>
      <p className="text-gray-500 mb-12 max-w-xl mx-auto">Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec at nulla nulla.</p>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
        {authors.map((author, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="relative mb-4">
               <div className="w-32 h-32 rounded-full border-4 border-yellow-400 p-1">
                  <img src="https://i.pravatar.cc/150" alt="" className="rounded-full w-full h-full object-cover" />
               </div>
            </div>
            <div className="border border-dashed border-[--header-color] rounded-lg p-3 w-full">
                <h4 className="font-bold text-[--primary-color]">{author.name}</h4>
                <p className="text-xs text-gray-400 mt-1">{author.books}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}