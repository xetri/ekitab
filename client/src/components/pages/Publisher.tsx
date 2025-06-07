import { useParams, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { Book } from "@lib/types";

const mockBooks: (Book & { rating: number })[] = [
  {
    id: "book1",
    title: "Mastering TypeScript",
    price: 999,
    // imgUrl: "https://via.placeholder.com/400x250?text=Book+1",
    publisherId: "pub123",
    categories: ["Programming"],
    rating: 4.2,
  },
  {
    id: "book2",
    title: "React Patterns Deep Dive",
    price: 1299,
    // imgUrl: "https://via.placeholder.com/400x250?text=Book+2",
    publisherId: "pub123",
    categories: ["Web Development"],
    rating: 4.8,
  },
  {
    id: "book3",
    title: "Node.js Essentials",
    price: 749,
    // imgUrl: "https://via.placeholder.com/400x250?text=Book+3",
    publisherId: "pub123",
    categories: ["Backend Development"],
    rating: 3.7,
  },
];

export default function Publisher() {
  const navigate = useNavigate();
  const { publisherId } = useParams<{ publisherId: string }>();
  const publisherBooks = mockBooks.filter((book) => book.publisherId === publisherId);

  const avgRating =
    publisherBooks.length > 0
      ? publisherBooks.reduce((sum, book) => sum + book.rating, 0) / publisherBooks.length
      : 0;

  const onBookClick = (book: Book) => {
    navigate(`/books/${book.id}`, {
      state: { book },
    });
  }

  const renderStars = (rating: number) => {
    const fullStars = Math.round(rating); // round to nearest whole number
    return (
      <div className="flex gap-1 items-center text-yellow-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < fullStars ? "fill-yellow-500" : "fill-none"}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating.toFixed(1)})</span>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Publisher Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-bold shadow-md">
          {publisherId?.charAt(0).toUpperCase()}
        </div>
        <h1 className="mt-5 text-4xl font-extrabold text-gray-900">
          Books by {publisherId}
        </h1>
        <p className="text-gray-500 text-sm mt-1">All books published by this user</p>

        {/* Average Rating */}
        {publisherBooks.length > 0 && (
          <div className="mt-3">{renderStars(avgRating)}</div>
        )}
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
              <div className="aspect-[16/9]">
                <img
                  // src={book.imgUrl}
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

                <div className="text-yellow-500">{renderStars(book.rating)}</div>

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