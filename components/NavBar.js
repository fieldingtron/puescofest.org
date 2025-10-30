import React, { useState } from "react";

const links = [
  { href: "#video", label: "Video" },
  { href: "#somos", label: "Somos" },
  { href: "#musica", label: "Musica" },
  { href: "#actividades", label: "Actividades" },
  { href: "#kayak", label: "Kayak" },
  { href: "#tickets", label: "Tickets" },
  { href: "#llegar", label: "Llegar" },
  { href: "#fotos", label: "Fotos" },
  { href: "#camping", label: "Camping" },
  { href: "#contacto", label: "Contacto" },
];

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="container relative mx-auto px-6">
      <div className="flex items-center justify-between my-6">
        <div className="z-30">
          <img
            src="/images/logo-puescofest-negro.png"
            alt="Puesco Fest Logo"
            className="block max-h-10 dark:hidden"
          />
          <img
            src="/images/logo-puescofest-blanco.png"
            alt="Puesco Fest Logo"
            className="max-h-10 hidden dark:block"
          />
        </div>

        <div className="hidden md:flex items-center space-x-4 uppercase text-xs">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-softRed"
              data-te-smooth-scroll-init
            >
              {link.label}
            </a>
          ))}
          {/* Social Links */}
          <a
            href="https://www.instagram.com/puescofest/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 ml-2"
            aria-label="Instagram"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.782 2.225 7.148 2.163 8.414 2.105 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.771.128 4.659.388 3.678 1.37 2.697 2.351 2.437 3.463 2.379 4.744 2.321 6.025 2.309 6.434 2.309 12c0 5.566.012 5.975.07 7.256.058 1.281.318 2.393 1.299 3.374.981.981 2.093 1.241 3.374 1.299 1.281.058 1.69.07 7.256.07s5.975-.012 7.256-.07c1.281-.058 2.393-.318 3.374-1.299.981-.981 1.241-2.093 1.299-3.374.058-1.281.07-1.69.07-7.256s-.012-5.975-.07-7.256c-.058-1.281-.318-2.393-1.299-3.374C21.393.388 20.281.128 19 .07 17.719.012 17.309 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/puescofest/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 ml-2"
            aria-label="Facebook"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
            </svg>
          </a>
          <button
            id="theme-toggle"
            className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2"
          >
            <svg
              id="theme-toggle-dark-icon"
              className="w-5 h-5 hidden"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              suppressHydrationWarning={true}
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
            <svg
              id="theme-toggle-light-icon"
              className="w-5 h-5 hidden"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              suppressHydrationWarning={true}
            >
              <path
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <button
          id="menu-btn"
          className="z-30 block md:hidden focus:outline-none hamburger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="hamburger-top dark:bg-slate-50 bg-blue-950"></span>
          <span className="hamburger-middle dark:bg-slate-50 bg-blue-950"></span>
          <span className="hamburger-bottom dark:bg-slate-50 bg-blue-950"></span>
        </button>
      </div>

      <div
        id="menu"
        className={`fixed inset-0 z-20 ${
          isMenuOpen ? "flex" : "hidden"
        } flex-col items-center self-end w-full h-full px-6 py-1 pt-24 pb-4 tracking-widest text-white uppercase divide-y divide-gray-500 opacity-90 bg-veryDarkBlue md:hidden`}
      >
        {links.map((link) => (
          <div key={link.href} className="w-full py-3 text-center">
            <a
              href={link.href}
              className="block hover:text-softRed"
              onClick={handleLinkClick}
            >
              {link.label}
            </a>
          </div>
        ))}
        {/* Social Links for mobile menu */}
        <div className="w-full py-3 text-center flex justify-center space-x-4">
          <a
            href="https://www.instagram.com/puescofest/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500"
            aria-label="Instagram"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.782 2.225 7.148 2.163 8.414 2.105 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.771.128 4.659.388 3.678 1.37 2.697 2.351 2.437 3.463 2.379 4.744 2.321 6.025 2.309 6.434 2.309 12c0 5.566.012 5.975.07 7.256.058 1.281.318 2.393 1.299 3.374.981.981 2.093 1.241 3.374 1.299 1.281.058 1.69.07 7.256.07s5.975-.012 7.256-.07c1.281-.058 2.393-.318 3.374-1.299.981-.981 1.241-2.093 1.299-3.374.058-1.281.07-1.69.07-7.256s-.012-5.975-.07-7.256c-.058-1.281-.318-2.393-1.299-3.374C21.393.388 20.281.128 19 .07 17.719.012 17.309 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/puescofest/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
            aria-label="Facebook"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
            </svg>
          </a>
        </div>
        <div className="w-full py-3 text-center">
          <button
            id="theme-toggle2"
            className="text-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-2"
          >
            <svg
              id="theme-toggle-light-icon"
              className="w-5 h-5 hover:fill-softRed fill-slate-100"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
