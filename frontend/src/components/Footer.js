function Footer() {
  return (
    <footer id="contact" className="bg-dark text-white mt-5 py-5">
      <div className="container text-center">
        <h4 className="fw-bold mb-3">Contact Us</h4>
        <p className="mb-1">📞 +1 (555) 123-4567</p>
        <p className="mb-1">✉️ support@digitalmenu.com</p>
        <p className="mb-3">📍 123 Main Street, Food City</p>
        <div className="mb-3">
          🌐 Follow us:
          <a href="#" className="text-white ms-2">Facebook</a> | 
          <a href="#" className="text-white ms-2">Instagram</a> | 
          <a href="#" className="text-white ms-2">Twitter</a>
        </div>
        <p className="mb-3">🕒 Open Daily: 10:00 AM – 11:00 PM</p>
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Digital Menu. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
