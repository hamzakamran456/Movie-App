import React from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

const Header = () => {
  const navigate = [
    {
      label: "Tv Shows",
      href: "tv",
    },
    {
      label: "Movies",
      href: "movie",
    },
  ];

  return (
    <header className="fixed top-0 w-full h-16 bg-neutral-600  bg-opacity-75">
      <div className="container mx-auto px-3 flex items-center h-full">
        <div>
          <img src={logo} alt="logo" width={120} />
        </div>
        <nav className="flex items-center gap-1 ml-5">
          {navigate.map((nav, index) => {
            return (
              <div>
                <NavLink key={nav.label} to={nav.href} className={"px-2 hover:text-neutral-100"}>
                {nav.label}
                </NavLink>
              </div>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
