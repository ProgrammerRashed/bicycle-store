import { Product } from "@/redux/features/product/productApi";
import RatingCard from "./ProductRating";
interface ReviewsProps {
  product: Product;
}
const Reviews: React.FC<ReviewsProps> = ({ product }) => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      date: "December 4, 2024 at 3:12 pm",
      review:
        "The views from The High Roller were absolutely stunning! It's a fantastic way to see the Strip and the surrounding area. The cabins are spacious and comfortable, and the audio commentary adds an extra layer of enjoyment. Highly recommend!",
      rating: 5,
      avatar:
        "https://carento-nextjs.vercel.app/assets/imgs/page/tour-detail/avatar.png",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      date: "December 4, 2024 at 3:12 pm",
      review:
        "The views from The High Roller were absolutely stunning! It's a fantastic way to see the Strip and the surrounding area. The cabins are spacious and comfortable, and the audio commentary adds an extra layer of enjoyment. Highly recommend!",
      rating: 5,
      avatar:
        "https://carento-nextjs.vercel.app/assets/imgs/page/tour-detail/avatar.png",
    },
  ];

  return (
    <div className="mt-5 border p-5 rounded-lg">
      <div className="mb-5">
        <RatingCard product={product} />
      </div>
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white shadow-md rounded-lg p-6 mb-4 border"
        >
          <div className="flex items-center gap-4">
            <img
              src={review.avatar}
              alt={review.name}
              className="w-12 h-12 rounded-full border"
            />
            <div>
              <h4 className="font-semibold">{review.name}</h4>
              <p className="text-sm text-gray-500">{review.date}</p>
            </div>
          </div>
          <hr className="my-3" />
          <p className="text-gray-700">{review.review}</p>
          <div className="mt-3 flex items-center">
            {Array.from({ length: review.rating }).map((_, i) => (
              <span key={i} className="text-yellow-500 text-lg">
                ⭐
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
