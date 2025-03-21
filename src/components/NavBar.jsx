import {Link} from "react-router-dom";

import '../css/Navbar.css'

function NavBar() {
  return (
    <nav className="navbar fixed-top">
      <div className="navbar-brand">
       <img src="/logo.png" alt="Movie App Logo" style={{ height: '40px', marginRight: '10px', borderRadius: '30%' }} />
          <Link to="/">Movie App</Link>
      </div>

      <div className="navbar-links">
           <Link to="/" className="nav-link">Home</Link>
           <Link to="/favorites" className="nav-link">Favorites</Link>
      </div>

    </nav>
  );
}

export default NavBar;