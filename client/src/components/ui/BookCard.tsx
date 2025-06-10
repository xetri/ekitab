import { useNavigate } from "react-router-dom";
import { Button } from "@radix-ui/themes";
import { Book } from "@lib/types";
import config from "@/config";

interface Props extends Book {}

function BookCard({ id, title, author, categories }: Props) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/book/${id}`);
  };

  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/book/${id}`);
  };

  return (<div 
    className="cursor-pointer"
    onClick={handleCardClick}
    aria-label={`Open details for ${title}`}
  >
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-xs p-4 flex flex-col space-y-4">
      <div className="aspect-[16/9] overflow-hidden rounded-xl">
        <img
          src={`${config.CDN_URL}/${id}_cover.jpg`}
          loading="lazy"
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
          <p className="text-sm text-gray-500">{author}</p>

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
          className="flex-1 py-2 text-sm rounded-xl border border-primary bg-neutral text-primary hover:bg-[#FFA94D] hover:text-white transition-colors duration-200"
          onClick={handleView}
          aria-label="View More"
        >
          View More
        </Button>
      </div>
    </div>
  </div>);
}

export default BookCard;
