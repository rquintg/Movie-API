import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Favorites from "./pages/Favorites.jsx";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import {MovieProvider} from "./contexts/MovieContext.jsx";

import './css/App.css'



function App() {

      return (
          <div>
              <MovieProvider>
                <NavBar />
                  <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/favorites" element={<Favorites />} />
                    </Routes>
                  </main>
                  <Footer />
              </MovieProvider>
          </div>
      )
}

export default App
