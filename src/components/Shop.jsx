import React from 'react';

const Shop = () => {
  return (
    <section id="shop" className="py-16 px-4 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-10">HB95 Merch - Coming Soon</h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* T-shirt */}
        <div className="bg-white rounded shadow p-4">
          <img src="/tee.png" alt="HB95 T-Shirt" className="w-full mb-4 rounded" />
          <h3 className="text-xl font-semibold mb-2">HB95 T-Shirt</h3>
          <p className="mb-4 text-gray-600">£12.99</p>
          <button className="bg-teal-600 text-white px-6 py-2 rounded shadow hover:bg-teal-700">
            Buy Now
          </button>
        </div>

        {/* Cap */}
        <div className="bg-white rounded shadow p-4">
          <img src="/cap.png" alt="HB95 Cap" className="w-full mb-4 rounded" />
          <h3 className="text-xl font-semibold mb-2">HB95 Cap</h3>
          <p className="mb-4 text-gray-600">£9.99</p>
          <button className="bg-teal-600 text-white px-6 py-2 rounded shadow hover:bg-teal-700">
            Buy Now
          </button>
        </div>

        {/* Sticker */}
        <div className="bg-white rounded shadow p-4">
          <img src="/sticker.png" alt="HB95 Sticker" className="w-full mb-4 rounded" />
          <h3 className="text-xl font-semibold mb-2">HB95 Sticker</h3>
          <p className="mb-4 text-gray-600">£3.99</p>
          <button className="bg-teal-600 text-white px-6 py-2 rounded shadow hover:bg-teal-700">
            Buy Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Shop;
