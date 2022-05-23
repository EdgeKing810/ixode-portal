import React, { useCallback, useEffect, useState } from "react";

import { useThemeStore } from "../stores/useThemeStore";

import Navbar from "../components/Navbar";
import Sidebar from "../components/includes/Sidebar";

export default function Template() {
  const { theme } = useThemeStore((state) => state);

  const [isActive, setIsActive] = useState(false);

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setIsActive(false);
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className={`w-full lg:h-screen ${
        theme === "light" ? "bg-main-lightbg" : "bg-main-darkbg"
      } ease-in-out duration-400 lg:pb-0 pb-20`}
    >
      <Navbar currentPage="template" />
      <div
        className={`w-full p-2 lg:px-0 lg:pb-0 pt-20 flex lg:overflow-y-hidden lg:h-full`}
      >
        <Sidebar currentPage="template" />
        <div className="w-full lg:p-8 flex flex-col lg:flex-row"></div>
      </div>
    </div>
  );
}
