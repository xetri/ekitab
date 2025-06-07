import { useState } from "react";
import axios from "axios";
import BookForm from "@ui/BookForm";
import { Book } from "@lib/types";
import { Button } from "@radix-ui/themes";
import config from "@/config";

const mockPublishedBooks: Book[] = [
  {
    id: "b1",
    title: "Deep Dive into React",
    price: 1200,
    publisherId: "user123",
    categories: ["React", "Frontend"],
  },
];

const mockPurchasedBooks: Book[] = [
  {
    id: "b2",
    title: "TypeScript for Pro Devs",
    price: 950,
    publisherId: "other-user",
    categories: ["TypeScript", "JavaScript"],
  },
];

export default function Dashboard() {
  const currentUserId = "user123";
  const [publishedBooks, setPublishedBooks] = useState<Book[]>(mockPublishedBooks);
  const [showForm, setShowForm] = useState(false);

  const handleBookUpload = (newBook: Book) => {
    try {
      (async () => {
        const res = await axios.post(
          `${config.API_URL}/upload/book`,
          { 
            ...newBook
          },
          {
            withCredentials: true,
          }
        )
      })()
    } catch(e) {
    }

    // setPublishedBooks((prev) => [...prev, { ...newBook }]);
    setShowForm(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
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
            <BookForm publisherId={currentUserId} onSubmit={handleBookUpload} />
          </div>
        )}
      </section>

      {/* Published Books */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">📚 Books You Published</h2>
        {publishedBooks.length === 0 ? (
          <p className="text-gray-500">You haven’t published any books yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {publishedBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-xl shadow p-4 space-y-2">
                {/* <img src={book.imgUrl} alt={book.title} className="rounded-md w-full aspect-[16/9] object-cover" /> */}
                <h3 className="text-lg font-semibold truncate">{book.title}</h3>
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
        {mockPurchasedBooks.length === 0 ? (
          <p className="text-gray-500">No purchases yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {mockPurchasedBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-xl shadow p-4 space-y-2">
                {/* <img src={book.imgUrl} alt={book.title} className="rounded-md w-full aspect-[16/9] object-cover" /> */}
                <h3 className="text-lg font-semibold truncate">{book.title}</h3>
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
