import { useState } from "react";
import { Button } from "@radix-ui/themes";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { Book, Review } from "@lib/types";

const mockBook: Book = {
  id: "123",
  title: "Mastering TypeScript for React",
  price: 899,
  // imgUrl: "https://images.unsplash.com/photo-1553729459-efe14ef6055d",
  publisherId: "456",
  categories: ["Programming", "Frontend"],
};

export default function BookPage() {
  const { bookId } = useParams<{ bookId: string }>();
  const book = mockBook;

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      user: "Sujan B.",
      rating: 5,
      comment: "Excellent book for TypeScript beginners!",
    },
    {
      id: 2,
      user: "Aarati T.",
      rating: 4,
      comment: "Well-structured and very helpful for React devs.",
    },
  ]);

  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  const handleAddReview = () => {
    if (newRating === 0 || newComment.trim() === "") {
      toast.error("Please provide both rating and comment.");
      return;
    }

    const newReview: Review = {
      id: Date.now(),
      user: "You",
      rating: newRating,
      comment: newComment,
    };

    setReviews((prev) => [newReview, ...prev]);
    setNewRating(0);
    setNewComment("");
    toast.success("Thank you for your review!");
  };

  const averageRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

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
          {rating.toFixed(1)} ({reviews.length} review{reviews.length > 1 ? "s" : ""})
        </span>
      </div>
    );
  };

  const handleBuyNow = () => {
    toast.info("Redirecting to payment...");
    // Redirect to payment page or handle payment logic here
  };

  const handleAddToCart = () => {
    toast.info("Added to cart");
    // Add to cart logic here
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-12">
      {/* Book Details */}
      <div className="grid md:grid-cols-2 gap-10">
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img
            // src={book.imgUrl}
            alt={book.title}
            className="aspect-[16/9] w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
          <p className="text-xl font-semibold text-gray-800">
            NPR {book.price.toLocaleString()}
          </p>
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
              onClick={handleAddToCart}
              className="flex-1 py-2 text-sm rounded-xl bg-gray-100 hover:bg-gray-200"
            >
              Add to Cart
            </Button>
            <Button
              onClick={handleBuyNow}
              className="flex-1 py-2 text-sm rounded-xl bg-primary text-white hover:bg-[#FFA94D]"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>

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
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          placeholder="Write your thoughts here..."
        />

        <Button
          onClick={handleAddReview}
          className="bg-primary text-white hover:bg-[#FFA94D]"
        >
          Submit Review
        </Button>
      </div>

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
                <span className="text-sm font-medium text-gray-800">{review.user}</span>
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
              <p className="text-sm text-gray-700">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
