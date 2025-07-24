import React from 'react';

const Donate = () => {
  return (
    <section id="donate" className="relative py-16 px-4 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-10 text-teal-900">Support HB95</h2>

      {/* 🚧 Coming Soon Banner */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-teal-600 text-black font-semibold px-6 py-2 rounded-full shadow-md z-20">
        🛠️ Donations Coming Soon!
      </div>

      <div className="max-w-3xl mx-auto opacity-50 pointer-events-none blur-sm select-none">
        <p className="text-lg mb-6 text-gray-700">
          Karting is an amazing sport — but it’s also expensive! Every contribution helps Harley get closer to the podium.
        </p>

        <div className="grid sm:grid-cols-3 gap-6">
          <button className="bg-teal-600 text-white px-6 py-3 rounded shadow hover:bg-teal-700">
            £5
          </button>
          <button className="bg-teal-600 text-white px-6 py-3 rounded shadow hover:bg-teal-700">
            £10
          </button>
          <button className="bg-teal-600 text-white px-6 py-3 rounded shadow hover:bg-teal-700">
            £20
          </button>
        </div>

        <p className="mt-6 text-gray-600">Or choose a custom amount</p>
        <input
          type="text"
          placeholder="£ Amount"
          className="mt-2 px-4 py-2 rounded border border-gray-300 w-1/2"
        />

        <div className="mt-4">
          <button className="bg-gray-400 text-white px-6 py-2 rounded shadow cursor-not-allowed">
            Donate via PayPal
          </button>
        </div>
      </div>

      <p className="mt-10 text-sm text-gray-500 italic">
        Thank you for your support — donation options will be live soon!
      </p>
    </section>
  );
};

export default Donate;
