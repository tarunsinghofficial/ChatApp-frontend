import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

function Navbar() {
  return (
    <div className="flex flex-row relative top-0 justify-between w-full bg-green-primary p-4 items-center">
      <a href="/">
        <h2 className="text-white text-2xl font-bold">Chat App</h2>
      </a>
      <GiHamburgerMenu className="text-white text-2xl hover:cursor-pointer" />
    </div>
  );
}

export default Navbar;
