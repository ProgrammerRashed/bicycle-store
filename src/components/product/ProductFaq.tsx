const ProductFaQ = () => {
  return (
    <div className="rounded-lg border p-5">
      <h1 className="text-2xl font-bold mb-6">Question Answers</h1>

      <div className="space-y-4">
        <div className="border-b pb-4">
          <h2 className="text-lg font-semibold">
            Is The High Roller suitable for all ages?
          </h2>
          <p className="text-gray-600 mt-2">
            Absolutely! The High Roller offers a family-friendly experience
            suitable for visitors of all ages. Children must be accompanied by
            an adult.
          </p>
        </div>

        <div className="border-b pb-4">
          <h2 className="text-lg font-semibold">
            Can I bring food or drinks aboard The High Roller?
          </h2>
          <p className="text-gray-600 mt-2">
            Outside food and beverages are not permitted on The High Roller.
            However, there are nearby dining options at The LINQ Promenade where
            you can enjoy a meal before or after your ride.
          </p>
        </div>

        <div className="pb-4">
          <h2 className="text-lg font-semibold">
            Is The High Roller wheelchair accessible?
          </h2>
          <p className="text-gray-600 mt-2">
            Yes, The High Roller cabins are wheelchair accessible, making it
            possible for everyone to enjoy the breathtaking views of Las Vegas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductFaQ;
