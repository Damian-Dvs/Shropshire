import React from 'react';

const Shop = () => {
  return (
    <section id="shop" className="relative py-16 px-4 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-10 text-teal-900">Support HB95</h2>
      {/* 🔥 Coming Soon Banner */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-teal-600 text-black font-semibold px-6 py-2 rounded-full shadow-md z-20">
        🚧 Merch Store Coming Soon!
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto opacity-50 pointer-events-none blur-sm select-none">
        {/* T-shirt */}
        <div className="bg-white rounded shadow p-4">
          <img src="/tee.png" alt="HB95 T-Shirt" className="w-full mb-4 rounded" />
          <h3 className="text-xl font-semibold mb-2">HB95 T-Shirt</h3>
          <p className="mb-4 text-gray-600">£12.99</p>
          <button className="bg-teal-600 text-white px-6 py-2 rounded shadow">
            Buy Now
          </button>
        </div>

        {/* Cap */}
        <div className="bg-white rounded shadow p-4">
          <img src="/cap.png" alt="HB95 Cap" className="w-full mb-4 rounded" />
          <h3 className="text-xl font-semibold mb-2">HB95 Cap</h3>
          <p className="mb-4 text-gray-600">£9.99</p>
          <button className="bg-teal-600 text-white px-6 py-2 rounded shadow">
            Buy Now
          </button>
        </div>

        {/* Sticker */}
        <div className="bg-white rounded shadow p-4">
          <img src="/sticker.png" alt="HB95 Sticker" className="w-full mb-4 rounded" />
          <h3 className="text-xl font-semibold mb-2">HB95 Sticker</h3>
          <p className="mb-4 text-gray-600">£3.99</p>
          <button className="bg-teal-600 text-white px-6 py-2 rounded shadow">
            Buy Now
          </button>
        </div>
      </div>

      <p className="mt-8 text-gray-500 text-sm italic">
        Store launching soon — stay tuned for official HB95 gear!
      </p>
    </section>
  );
};

export default Shop;
