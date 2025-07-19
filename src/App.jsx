import Navbar from './components/Navbar';
import About from './components/About';
import Results from './components/Results';
import Gallery from './components/Gallery';
import Updates from './components/Updates';
import Contact from './components/Contact';
import Donate from './components/Donate';
import Shop from './components/Shop';

function App() {
  return (
    <>
      <Navbar />
      <section
      id="hero"
      className="h-screen relative bg-cover bg-center bg-no-repeat text-black"
      style={{ backgroundImage: "url('/Hero.jpeg')" }}
    >
      {/* Optional overlay for better contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-20" />

        {/* Button wrapper positioned bottom-center */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center z-10">
          <a href="#results">
            <button className="bg-teal-600 text-black px-6 py-3 font-semibold rounded shadow-lg hover:scale-105 transition">
              View Race Results
            </button>
          </a>
        </div>
      </section>


      <About />
      <Results />
      <Gallery />
      <Updates />
      <Shop />
      <Donate />
      <Contact />
    </>
  );
}

export default App;
