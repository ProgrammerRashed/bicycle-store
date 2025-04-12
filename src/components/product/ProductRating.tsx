interface Product {
  rating: number;
  reviews: number;
}

interface Rating {
  label: string;
  value: number;
}

const ratings: Rating[] = [
  { label: "Price", value: 4.8 },
  { label: "Service", value: 4.2 },
  { label: "Safety", value: 4.9 },
  { label: "Entertainment", value: 4.7 },
  { label: "Accessibility", value: 5.0 },
  { label: "Support", value: 5.0 },
];

interface RatingCardProps {
  product: Product;
}

const RatingCard: React.FC<RatingCardProps> = ({ product }) => {
  return (
    <div className="border rounded-lg p-6 bg-white shadow-md max-w-lg">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Rate Reviews</h2>
      <div className="flex items-center gap-4">
        <div className="border p-4 rounded-lg flex flex-col items-center">
          <p className="text-2xl font-bold text-gray-900">
            {product.rating} / 5
          </p>
          <p className="text-sm text-gray-500">({product.reviews})</p>
          <div className="flex mt-1">
            {[...Array(5)].map((_, index) => (
              <span key={index} className="text-yellow-500 text-lg">
                ★
              </span>
            ))}
          </div>
        </div>
        <div className="flex-1">
          {ratings.map((rating, index) => (
            <div key={index} className="flex items-center justify-between mb-2">
              <span className="text-gray-700">{rating.label}</span>
              <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2 relative">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: `${(rating.value / 5) * 100}%` }}
                ></div>
              </div>
              <span className="text-gray-700">{rating.value}/5</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingCard;
