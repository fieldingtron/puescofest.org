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
        className={`fixed inset-0 z-20 ${isMenuOpen ? "flex" : "hidden"} flex-col items-center self-end w-full h-full px-6 py-1 pt-24 pb-4 tracking-widest text-white uppercase divide-y divide-gray-500 opacity-90 bg-veryDarkBlue md:hidden`}
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
