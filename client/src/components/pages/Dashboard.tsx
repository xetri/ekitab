import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BookForm from "@ui/BookForm";
import { Book } from "@lib/types";
import { Button } from "@radix-ui/themes";
import config from "@/config";
import { useAuth } from "@/lib/store/auth";

export default function Dashboard() {
  const navigate = useNavigate();
  const self = useAuth();

  const [fetching, setFetching] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [publishedBooks, setPublishedBooks] = useState<Book[]>([]);
  const [purchasedBooks, setPurchasedBooks] = useState<Book[]>([]);

  useEffect(() => {
    (async() => {
      try {
        const bookRes = await axios.get(`${config.API_URL}/books`);
        const orderRes = await axios.get(`${config.API_URL}/books/order`, { withCredentials: true });

        const books = bookRes.data;
        const orders = orderRes.data.map((order: any) => order.bookId);

        setPublishedBooks(books.filter((book: Book) => book.sellerId === self.user?.uid));
        setPurchasedBooks(books.filter((book: Book) => orders.includes(book.id)));

        setFetching(false);
      } catch(e) {
        setFetching(false);
      }
    })()
  }, [])

  const handleBookUpload = (newBook: Book, coverImage: File, bookFile: File) => {
    const book = Object.entries(newBook);

    const formData = new FormData();
    for (const [key, value] of book) {
      formData.append(key, value);
    }
    formData.append("cover", coverImage);
    formData.append("book", bookFile);

    try {
      (async () => {
        const res = await axios.post(
          `${config.API_URL}/upload/book`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true
          }
        );

      })()
    } catch(e) {
    }

    setPublishedBooks((prev) => [...prev, { ...newBook }]);
    setShowForm(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      {/* Dashboard Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">📊 Dashboard</h1>
        <p className="text-gray-500 text-sm">Manage your published and purchased books</p>
      </div>

      {/* Toggle Book Form */}
      <section className="space-y-4">
        <div className="flex justify-center">
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary text-white hover:bg-[#FFA94D]"
          >
            {showForm ? "Cancel Upload" : "➕ Upload New Book"}
          </Button>
        </div>

        {showForm && (
          <div className="mt-3">
            <BookForm onSubmit={handleBookUpload} />
          </div>
        )}
      </section>

      {/* Published Books */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">📚 Books You Published</h2>
        {
          fetching && (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow p-4 space-y-2">
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
            </div>
            )
          }
        {publishedBooks.length === 0 && !fetching ? (
          <p className="text-gray-500">You haven’t published any books yet.</p>
        ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {publishedBooks.map((book) => (
              <div 
                key={book.id} className="bg-white rounded-xl shadow p-4 space-y-2 cursor-pointer"
                onClick={() => {
                  navigate(`/book/${book.id}`);
                }}
              >
                <img 
                  src={`${config.CDN_URL}/${book.id}_cover.jpg`}
                  alt={book.title} 
                  className="rounded-md w-full aspect-[16/9] object-cover" 
                />
                <h3 className="text-lg font-semibold truncate">{book.title}</h3>
                <p className="text-sm text-gray-500">by {book.author}</p>
                <p className="text-sm text-muted-foreground">NPR {book.price.toLocaleString()}</p>
                <div className="flex flex-wrap gap-1 text-xs text-gray-600">
                  {book.categories.map((c) => (
                    <span key={c} className="bg-gray-100 px-2 py-0.5 rounded">{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Purchased Books */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">🛒 Books You Purchased</h2>
        {
          fetching && (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow p-4 space-y-2">
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
            </div>
            )
        }
        {purchasedBooks.length === 0 && !fetching ? (
          <p className="text-gray-500">No purchases yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {purchasedBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-xl shadow p-4 space-y-2 cursor-pointer"
                onClick={() => {
                  navigate(`/book/${book.id}`);
                }}
              >
                <img 
                  src={`${config.CDN_URL}/${book.id}_cover.jpg`}
                  alt={book.title} 
                  className="rounded-md w-full aspect-[16/9] object-cover" 
                />
                <h3 className="text-lg font-semibold truncate">{book.title}</h3>
                <p className="text-sm text-gray-500">by {book.author}</p>
                <p className="text-sm text-muted-foreground">NPR {book.price.toLocaleString()}</p>
                <div className="flex flex-wrap gap-1 text-xs text-gray-600">
                  {book.categories.map((c) => (
                    <span key={c} className="bg-gray-100 px-2 py-0.5 rounded">{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
