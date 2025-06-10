import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@radix-ui/themes";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { Book, Review } from "@lib/types";
import NotFound from "@pages/404";
import config from "@/config";
import { useAuth } from "@/lib/store/auth";
import Spinner from "../ui/Spinner";
import { Cross1Icon } from "@radix-ui/react-icons";

export default function BookPage() {
  const [fetching, setFetching] = useState(true);
  const { bookId } = useParams<{ bookId: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [book, setBook] = useState<Book>();
  const self = useAuth();

  useEffect(() => {
    try {
      (async () => {
          const res = await axios.get(config.API_URL + `/books/${bookId}`, {
            withCredentials: true,
          });
          const { book, reviews } = res.data as { book: Book, reviews: Review[] };
          setBook(book);
          setReviews(reviews);
          setFetching(false);
        })();
    } catch (error) {
      console.error("Error fetching book:", error);
      toast.error("Failed to fetch book details.");
      setFetching(false);
    }
  }, []);

  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  const handleAddReview = async () => {
    if (newRating === 0 || newComment.trim() === "") {
      toast.error("Please provide both rating and comment.");
      return;
    }

    const now = new Date(Date.now());
    const newReview: Review = {
      id: "",
      user: self.user?.uid as string,
      name: self.user?.name as string,
      rating: newRating,
      comment: newComment,
      bookId: bookId as string,
      createdAt: now,
      updatedAt: now,
    };
    
    try {
      const res = await axios.post(config.API_URL + "/books/review", {
        id: bookId,
        rating: newRating,
        comment: newComment,
      }, {
        withCredentials: true,
      });

      newReview.id = res.data.review.id;

      setReviews((prev) => [newReview as Review, ...prev]);
      setNewRating(0);
      setNewComment("");
      toast.success("Thank you for your review!");
    } catch(e) {
      toast.error("Failed to review!");
      return;
    }
  };

  const removeReview = async (id: string) => {
    try {
      const res = await axios.delete(config.API_URL + "/books/review/" + id, {
        withCredentials: true,
      });
      console.log(res);

      setReviews(reviews.filter((review) => review.id != id));
    } catch(e) {
      console.log(e)
    }
  }

  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const renderStars = (rating: number) => {
    const rounded = Math.round(rating);
    return (
      <div className="flex gap-1 items-center text-yellow-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rounded ? "fill-yellow-400" : "fill-none text-yellow-400"}
          />
        ))}
        <span className="text-sm text-gray-600 ml-2">
          {rating.toFixed(1) != "NaN" ? rating.toFixed(1) : "None"} ({reviews.length} review{reviews.length > 1 ? "s" : ""})
        </span>
      </div>
    );
  };

  if (fetching) {
    return (
      <div className="mt-5">
        <Spinner/>
      </div>
    )
  }

  if (!book) {
    return (
      <NotFound/>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-5 space-y-12">
      {/* Book Details */}
      <div className="grid md:grid-cols-2 gap-10">
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img
            src={config.CDN_URL + `/${book.id}_cover.jpg`}
            alt={book.title}
            className="aspect-[16/9] w-full h-full object-cover"
          />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">{book.title}</h1>
          <p className="text-sm text-gray-500">{book.author}</p>

          {/* ✅ Seller info */}
          <p className="text-sm text-gray-600">
              Publisher: {" "}
            <Link to={`/publisher/${book.sellerId}`}
              className="text-primary font-medium hover:underline"
              >
              {book.sellerName}
            </Link>
          </p>

          {/* ✅ Published Date */}
          <div>
            <span className="text-sm text-gray-500">
              {new Date(book.createdAt).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <div>{renderStars(averageRating)}</div>

          <div className="flex flex-wrap gap-2">
            {book.categories.map((cat) => (
              <span
                key={cat}
                className="px-3 py-1 text-xs rounded-full bg-gray-100 border border-gray-300 text-gray-700"
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="flex gap-4 pt-2">
            <Button
              onClick={() => {
                const a = document.createElement("a");
                a.href = `${config.CDN_URL}/${book.id}_book.pdf`;
                a.click();
              }}
              className="flex-1 py-2 text-sm rounded-xl bg-primary text-white hover:bg-[#FFA94D]"
            >
              Download
            </Button>
          </div>
        </div>
      </div>

      {self.loggedIn &&
      <>
      {/* Review Form */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Write a Review</h2>

        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              onClick={() => setNewRating(star)}
              className={`w-6 h-6 cursor-pointer ${
                newRating >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <textarea
          rows={4}
          value={newComment}
          disabled={!self.loggedIn}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          placeholder="Write your thoughts here..."
        />

        <Button
          onClick={handleAddReview}
          disabled={!self.loggedIn}
          className={self.loggedIn ? "bg-primary text-white hover:bg-[#FFA94D]" : `bg-gray-300 text-gray-500 hover:bg-none`}
        >
          Submit Review
        </Button>
      </div>
      </>
      }

      {/* Reviews */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">User Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-600">No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="flex gap-1 items-center">
                    {self.user?.uid == review.user &&
                    <div className="text-[#ff0000]">
                      <Cross1Icon className="cursor-pointer" onClick={async (e) => { await removeReview(review.id) } }/>
                    </div>
                    }
                    <div className="flex text-sm text-primary">{review.name}</div>
                  </div>
                  <span className="flex text-gray-500 text-sm">  
                    {new Date(book.createdAt).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i <= review.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm mt-5 text-gray-900">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
