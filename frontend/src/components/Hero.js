function Hero() {
  return (
    <section
      id="hero"
      className="relative flex items-center justify-center text-center text-white overflow-hidden"
      style={{ height: "70vh" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')",
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 hero-text-enter">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-balance">
          Welcome to Our Restaurant
        </h1>
        <p className="text-lg md:text-xl text-stone-200 mb-8">
          Authentic Flavors, Made Fresh Daily
        </p>
        <a
          href="#menu"
          className="inline-block px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold
            rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl no-underline"
        >
          Browse Menu
        </a>
      </div>
    </section>
  );
}

export default Hero;
