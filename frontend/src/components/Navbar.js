import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">
          <img
            src="https://cdn-icons-png.flaticon.com/512/857/857681.png"
            alt="logo"
            width="30"
            className="me-2"
          />
          Digital Menu
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><a href="#hero" className="nav-link">Home</a></li>
            <li className="nav-item"><a href="#menu" className="nav-link">Menu</a></li>
            <li className="nav-item"><a href="#contact" className="nav-link">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
