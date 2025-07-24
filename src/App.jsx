import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddToHomePrompt from './components/AddToHomePrompt';
import Navbar from './components/Navbar';
import About from './components/About';
import Results from './components/Results';
import Gallery from './components/Gallery';
import Updates from './components/Updates';
import Contact from './components/Contact';
import Donate from './components/Donate';
import Shop from './components/Shop';
import BlogPreview from './components/BlogPreview';
import BlogPage from './components/BlogPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>

        {/* Home Route */}
        <Route
          path="/"
          element={
            <>
              <section
                id="hero"
                className="h-screen relative bg-cover bg-center bg-no-repeat text-black"
                style={{ backgroundImage: "url('/Hero.jpeg')" }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-20" />

                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center z-10">
                  <a href="#results">
                    <button className="bg-teal-600 text-black px-6 py-3 font-semibold rounded shadow-lg hover:scale-105 transition">
                      View Race Results
                    </button>
                  </a>
                </div>
              </section>

              <AddToHomePrompt />
              <About />
              <Results />
              <BlogPreview /> {/* Only latest 3 posts here */}
              <Gallery />
              <Updates />
              <Shop />
              <Donate />
              <Contact />
            </>
          }
        />

        {/* Full Blog Page Route */}
        <Route path="/blog" element={<BlogPage />} />

      </Routes>
    </Router>
  );
}

export default App;
