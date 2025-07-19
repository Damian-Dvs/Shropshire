import React from 'react';

const Donate = () => {
  return (
    
    <section id="donate" className="py-16 bg-white text-center">
    <h2 className="text-3xl font-bold mb-4">Support Harley</h2>
    <p className="text-gray-700 mb-8">
        Help fund Harley’s karting journey. Choose a fixed donation or enter your own.
    </p>

    {/* Fixed Amount Buttons */}
    <div className="flex flex-wrap justify-center gap-4 mb-10">
        {[5, 10, 25, 50].map((amount) => (
        <form
            key={amount}
            action="https://www.paypal.com/donate"
            method="post"
            target="_blank"
        >
            <input type="hidden" name="business" value="your-paypal-email@example.com" />
            <input type="hidden" name="amount" value={amount} />
            <button
            type="submit"
            className="bg-teal-600 text-white px-6 py-3 rounded shadow hover:bg-teal-700 transition"
            >
            Donate £{amount}
            </button>
        </form>
        ))}
    </div>

    {/* Custom Amount */}
    <div className="max-w-md mx-auto">
        <h3 className="text-xl font-semibold mb-4">Custom Amount</h3>
        <form
        action="https://www.paypal.com/donate"
        method="post"
        target="_blank"
        className="flex flex-col sm:flex-row items-center gap-4"
        >
        <input type="hidden" name="business" value="your-paypal-email@example.com" />
        <input
            type="number"
            name="amount"
            placeholder="£ Amount"
            className="border px-4 py-2 rounded w-full sm:w-auto"
            required
            min="1"
        />
        <button
            type="submit"
            className="bg-teal-600 text-white px-6 py-2 rounded shadow hover:bg-teal-700 transition"
        >
            Donate
        </button>
        </form>
    </div>
    </section>

  );
};

export default Donate;
