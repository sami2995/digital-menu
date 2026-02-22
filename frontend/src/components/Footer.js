function Footer() {
  return (
    <footer
      id="contact"
      className="bg-stone-900 dark:bg-stone-950 text-stone-300 mt-16 py-12"
    >
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h4 className="text-white font-bold text-xl mb-4">Contact Us</h4>
        <p className="mb-1">+1 (555) 123-4567</p>
        <p className="mb-1">support@digitalmenu.com</p>
        <p className="mb-4">123 Main Street, Food City</p>

        <div className="flex items-center justify-center gap-4 mb-4">
          <a
            href="https://www.facebook.com"
            className="text-stone-400 hover:text-white transition-colors no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <span className="text-stone-600">|</span>
          <a
            href="https://www.instagram.com"
            className="text-stone-400 hover:text-white transition-colors no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <span className="text-stone-600">|</span>
          <a
            href="https://www.twitter.com"
            className="text-stone-400 hover:text-white transition-colors no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </div>

        <p className="text-sm text-stone-500 mb-1">
          Open Daily: 10:00 AM - 11:00 PM
        </p>
        <p className="text-sm text-stone-500">
          &copy; {new Date().getFullYear()} Digital Menu. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
