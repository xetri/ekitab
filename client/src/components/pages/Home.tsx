import fuse from "fuse.js";
import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "@ui/BookCard";
import { Book } from "@lib/types";
import config from "@/config";

type Props = {}

function Home({}: Props) {
  const [fetching, setFetching] = useState(true);

  const [fetchedBooks, setFetchedBooks] = useState<Book[]>([]);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(config.API_URL + "/books", {
        withCredentials: true,
      });
      
      setFetchedBooks(res.data as Book[]);
      setBooks(res.data);
      setFetching(false);
    })();
  }, []);

  const fuseInstance = new fuse(fetchedBooks, {
    keys: ["title", "categories", "author"],
    threshold: 0.3,
  });

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setBooks(fetchedBooks);
      return;
    }

    const results = fuseInstance.search(query);
    setBooks(results.map(result => result.item));
  }

  return (<>
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-primary">Explore Books</h1>

      {/* Search Bar */}
      <div className="mb-10 flex justify-center">
          {/* Input Field */}
          <input
            type="text"
            placeholder="Search by title or category..."
            className="w-full pl-4 pr-12 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={(e) => handleSearch(e.target.value)}
          />
      </div>

      <div className="flex justify-center">
        <div className="grid w-full text-2xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {
            fetching && (
                [...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow p-4 space-y-2">
                    <div className="w-full aspect-[16/9] bg-gray-200 rounded-md"></div>
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="flex flex-wrap gap-1">
                      <div className="bg-gray-200 h-4 w-12 rounded"></div>
                      <div className="bg-gray-200 h-4 w-16 rounded"></div>
                      <div className="bg-gray-200 h-4 w-10 rounded"></div>
                    </div>
                  </div>
                ))
            )
          }
          {
            (books.length === 0 && !fetching) && (
              <div className="w-full col-span-4 text-center text-gray-500">
                No books found
              </div>
            )
          }
          {books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              description={book.description}
              author={book.author}
              title={book.title}
              sellerId={book.sellerId}
              sellerName={book.sellerName}
              categories={book.categories}
              createdAt={book.createdAt}
              updatedAt={book.updatedAt}
            />
          ))}
        </div>
      </div>
    </div>
  </>)
}

export default Home
