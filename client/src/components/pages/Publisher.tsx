import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Book } from "@lib/types";
import config from "@/config";
import axios from "axios";

export default function Publisher() {
  const navigate = useNavigate();
  const { publisherId } = useParams<{ publisherId: string }>();
  const [pubName, setPubName] = useState(publisherId);
  const [publisherBooks, setPublisherBooks] = useState<Book[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${config.API_URL}/books/publisher/${publisherId}`);

        setPubName(res.data.publisherName);
        setPublisherBooks(res.data.books);
      } catch(e) {
      }
    })()

  }, [])

  const onBookClick = (book: Book) => {
    navigate(`/book/${book.id}`);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Publisher Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-bold shadow-md">
          {publisherId?.charAt(0).toUpperCase()}
        </div>
        <h1 className="mt-5 text-4xl font-extrabold text-gray-900">
          {pubName}
        </h1>
        <p className="text-gray-500 text-sm mt-3">Publications</p>
      </div>

      {/* Book Grid */}
      {publisherBooks.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {publisherBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg cursor-pointer"
              onClick={(_) => onBookClick(book)}
            >
               <div className="aspect-[16/9] overflow-hidden rounded-xl">
                <img
                  src={`${config.CDN_URL}/${book.id}_cover.jpg`}
                  alt={book.title}
                  className="aspect-[16/9] w-full h-full object-cover"
                />
              </div>

              <div className="p-5 space-y-3">
                <h3 className="text-xl font-semibold text-gray-900 truncate" title={book.title}>
                  {book.title}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {book.categories.map((cat) => (
                    <span
                      key={cat}
                      className="bg-gray-100 text-xs text-gray-600 px-2 py-1 rounded-full border border-gray-200"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <p className="text-lg font-bold text-gray-800">
                  NPR {book.price.toLocaleString()}
                </p>

                <div className="flex gap-2 pt-1">
                  <button className="flex-1 bg-gray-100 text-gray-800 rounded-lg py-2 text-sm hover:bg-gray-200 transition font-medium">
                    Add to Cart
                  </button>
                  <button className="flex-1 bg-primary text-white rounded-lg py-2 text-sm hover:bg-[#FFA94D] transition font-medium">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-20 text-gray-500 text-lg">
          No books published yet.
        </div>
      )}
    </div>
  );
}