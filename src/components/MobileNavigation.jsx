import React from "react";
import { mobileNavigation } from "../constants/Navigation";
import { NavLink } from "react-router-dom";

const MobileNavigation = () => {
  return (
    <div className="lg:hidden h-16 bg-black bg-opacity-70 backdrop-blur-3xl fixed bottom-0 w-full z-40">
      <div className="flex justify-between items-center h-full text-neutral-500">
        {mobileNavigation.map((nav) => {
          return (
            <NavLink
              key={nav.label + "mobilenavigation"}
              to={nav.href}
              className={({ isActive }) =>
                `px-3 flex h-full items-center flex-col justify-center ${
                  isActive && "text-white"
                }`
              }
            >
              <div className="text-2xl">{nav.icon}</div>
              <p className="text-sm">{nav.label}</p>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavigation;
