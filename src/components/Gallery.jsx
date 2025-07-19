const images = [
    '/kart1.jpeg',
    '/kart2.jpeg',
    '/kart3.jpeg',
  ];
  
  function Gallery() {
    return (
      <section id="gallery" className="bg-white py-16 px-6 md:px-20 text-black">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Harley karting ${index + 1}`}
                className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-200"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  export default Gallery;
  