function Hero() {
  return (
    <section
      id="hero"
      className="text-white text-center d-flex align-items-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "70vh",
      }}
    >
      <div className="container">
        <h1 className="display-3 fw-bold">Welcome to Our Restaurant</h1>
        <p className="lead">Authentic Flavors, Made Fresh Daily 🍲</p>
        <a href="#menu" className="btn btn-primary btn-lg mt-3">Browse Menu</a>
      </div>
    </section>
  );
}

export default Hero;
