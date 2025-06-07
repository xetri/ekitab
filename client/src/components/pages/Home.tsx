import { useState } from "react";
import { Search } from "lucide-react";
import BookCard from "@ui/BookCard";
import { Book } from "@lib/types";

type Props = {}

const books : Book[] = [
  {
    id: "book-1",
    title: "Atomic Habits",
    price: 850,
    imgUrl: "https://images.unsplash.com/photo-1553729459-efe14ef6055d",
    publisherId: "publisher-1",
    categories: ["Self-Help", "Productivity"],
  },
  {
    id: "book-2",
    title: "The Subtle Art of Not Giving a F*ck",
    price: 999,
    imgUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    publisherId: "publisher-2",
    categories: ["Self-Help", "Motivation"],
  },
  {
    id: "book-3",
    title: "Deep Work",
    price: 1200,
    imgUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    publisherId: "publisher-3",
    categories: ["Self-Help", "Productivity"],
  },
  {
    id: "book-4",
    title: "The Psychology of Money",
    price: 780,
    imgUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
    publisherId: "publisher-4",
    categories: ["Finance", "Self-Help"],
  },
  {
    id: "book-5",
    title: "Rich Dad Poor Dad",
    price: 890,
    imgUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
    publisherId: "publisher-5",
    categories: ["Finance", "Self-Help"],
  },
  {
    id: "book-6",
    title: "Clean Code",
    price: 1300,
    imgUrl: "https://images.unsplash.com/photo-1553729459-efe14ef6055d",
    publisherId: "publisher-6",
    categories: ["Programming", "Software Development"],
  },
]

function Home({}: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  }

  return (<>
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-primary">Explore Books</h1>

      {/* Search Bar */}
      <div className="mb-10 flex justify-center">
        <div className="relative w-full max-w-xl">
          {/* Input Field */}
          <input
            type="text"
            placeholder="Search by title or category..."
            className="w-full pl-4 pr-12 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
          />

          {/* Icon Button on the right */}
          <button
            onClick={handleSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.title}
            price={book.price}
            imgUrl={book.imgUrl}
            publisherId={book.publisherId}
            categories={book.categories}
          />
        ))}
      </div>
    </div>
  </>)
}

export default Home
