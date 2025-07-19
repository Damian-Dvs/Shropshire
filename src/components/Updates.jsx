import React, { useEffect } from 'react';

const Updates = () => {
  useEffect(() => {
    // Load Facebook SDK when component mounts
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, []);

  return (
    <section id="updates" className="bg-gray-100 py-12 px-4 text-center">
      <h2 className="text-3xl font-bold mb-6">Latest Updates</h2>
      <p className="mb-4">Follow Harley on Facebook for live updates and race day moments:</p>

      <a 
        href="https://www.facebook.com/people/HarleyBebb95/61571713146844/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition"
        >
        Follow Harley on Facebook
        </a>


    </section>
  );
};

export default Updates;
