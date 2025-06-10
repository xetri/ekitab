import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BookForm from "@ui/BookForm";
import { Book } from "@lib/types";
import { Button } from "@radix-ui/themes";
import config from "@/config";
import { useAuth } from "@/lib/store/auth";
import { useAuthDialog } from "@/lib/store/auth-dialog";

export default function Dashboard() {
  const navigate = useNavigate();
  const self = useAuth();
  const authDialog = useAuthDialog();

  const [fetching, setFetching] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editBook, setEditBook] = useState<boolean>(false);
  const [publishedBooks, setPublishedBooks] = useState<Book[]>([]);
  const [currentEditBook, setCurrentEditBook] = useState<Book>();

  useEffect(() => {
    (async() => {
      try {
        const bookRes = await axios.get(`${config.API_URL}/books`);
        const books = bookRes.data;

        setPublishedBooks(books.filter((book: Book) => book.sellerId == self.user?.uid));
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
        newBook.id = res.data.book.id;
        setShowForm(false);
        setPublishedBooks((prev) => [...prev, { ...newBook }]);
      })();
    } catch(e) {
    }
  };

  const handleBookEdit = async (updatedBook: Book) => {
    try {
      updatedBook.id = String(currentEditBook?.id);

      await axios.put(`${config.API_URL}/books/${updatedBook.id}`, updatedBook, {
        withCredentials: true,
      });

      setPublishedBooks(prev =>
        prev.map(book => (book.id === updatedBook.id ? updatedBook : book))
      );
      setEditBook(false);
    } catch (e) {}
  };

  const handleBookDelete = async (book: Book) => {
    try {
      await axios.delete(`${config.API_URL}/books/${book.id}`, {
        withCredentials: true,
      });
      setPublishedBooks(publishedBooks.filter(prev => prev.id != book.id));
    } catch(e) {
    }
  }

  if (!self.loading && !self.loggedIn) {
    return (
      <div className="min-h-100 flex items-center justify-center text-center px-4">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-red-600">🔒 Access Denied</h1>
          <p className="text-gray-600">You need to login to continue!</p>
          <Button
            onClick={() => {
              authDialog.setMode("login");
              authDialog.setOpen(true);
            }}
            className="bg-primary w-full text-white rounded-2xl hover:bg-[#FFA94D]"
          >
            Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      {/* Dashboard Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">📊 Dashboard</h1>
        <h1 className="mt-5 text-4xl font-extrabold text-gray-900">
          {self.user?.name}
        </h1>
        <p className="text-gray-500 text-sm">Manage your published and purchased books</p>
      </div>

      {/* Toggle Book Form */}
      <section className="space-y-4">
        <div className="flex justify-center">
          <Button
            onClick={() => {
              setEditBook(false);
              setShowForm(!showForm)
            }}
            className="bg-primary text-white hover:bg-[#FFA94D]"
          >
            {showForm ? "Cancel Upload" : "➕ Upload New Book"}
          </Button>
        </div>

        {showForm && (
          <div className="mt-3">
            <BookForm onSubmit={handleBookUpload} isEditing={false} />
          </div>
        )}
      </section>

      {/* Edit Book Form */}
      {editBook && (
        <section className="space-y-4">
          <div className="flex justify-center">
          <Button
            onClick={() => setEditBook(false)}
            className="bg-primary text-white hover:bg-[#FFA94D]"
          >
            Cancel Edit
          </Button>
          </div>

          <div className="mt-3">
            <BookForm
              initialData={currentEditBook}
              onSubmit={(updatedBook) => {
                handleBookEdit(updatedBook);
              }}
              isEditing={true}
            />
          </div>
        </section>
      )}

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
                <p className="text-sm text-gray-500">{book.author}</p>
                <div className="flex flex-wrap gap-1 text-xs text-gray-600">
                  {book.categories.map((c) => (
                    <span key={c} className="bg-gray-100 px-2 py-0.5 rounded">{c}</span>
                  ))}
                </div>

                <div className="pt-2 flex justify-between items-center">
                  {/* Edit button */}
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentEditBook(book);
                      setShowForm(false);
                      setEditBook(true);
                    }}
                    className="text-sm px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                  >
                    Edit
                  </Button>

                  {/* Delete button */}
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookDelete(book);
                    }}
                    className="text-sm px-3 py-1 rounded-md border border-red-500 text-red-600 hover:bg-red-100 transition"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
