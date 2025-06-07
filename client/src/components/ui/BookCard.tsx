import { useNavigate } from "react-router-dom";
import { Button } from "@radix-ui/themes";
import { toast } from "react-toastify";
import { Book } from "@lib/types";

interface Props extends Book {}

function BookCard({ id, title, price, imgUrl, publisherId, categories }: Props) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/book/${id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.info("Added to cart!");
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/buy/${id}`);
  };

  return (<div 
    className="cursor-pointer"
    onClick={handleCardClick}
    aria-label={`Open details for ${title}`}
  >
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-xs p-4 flex flex-col space-y-4">
      <div className="aspect-[16/9] overflow-hidden rounded-xl">
        <img
          // src={imgUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
      />
      </div>

      <div className="space-y-1">
        <div className="relative max-w-full peer">
          <h3
            className="text-lg font-semibold text-tertiary sm:truncate cursor-default overflow-hidden"
            title={title}
          >
            {title}
          </h3>

          {title.length > 24 && (
            <div 
              className="absolute bottom-full left-0 mb-1 hidden peer-hover:flex bg-black text-white text-xs px-3 py-2 rounded-md shadow-lg w-max max-w-xs z-10"
            >
              {title}
            </div>
          )}
        </div>
          <p className="text-sm text-gray-800">NPR {price.toLocaleString()}</p>

           <div className="flex flex-wrap gap-1 mt-1">
            {categories.map((category) => (
              <span
                key={category}
                className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700 border border-gray-300"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

      <div className="flex gap-2 mt-auto">
        <Button 
          className="flex-1 py-2 text-sm rounded-xl bg-gray-100 text-tertiary hover:bg-gray-200 transition-colors duration-200"
          onClick={handleAddToCart}
          aria-label="Add to Cart"
          >
          Add to Cart
        </Button>
        <Button 
          className="flex-1 py-2 text-sm rounded-xl bg-primary text-white hover:bg-[#FFA94D] transition-colors duration-200"
          onClick={handleBuyNow}
          aria-label="Buy Now"
        >
          Buy Now
        </Button>
      </div>
    </div>
  </div>);
}

export default BookCard;
