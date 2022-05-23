import React, { useState } from "react";

import { useThemeStore } from "../../stores/useThemeStore";
import { fetchData } from "../../utils/data";

import { Image, Linker } from "../Components";

import banner from "../../assets/images/banner_purple.png";

export default function Sidebar({ currentPage }) {
  const { theme } = useThemeStore((state) => state);
  const [pages] = useState(fetchData().navigation);

  return (
    <div
      className={`w-0 lg:w-1/5 invisible lg:visible ${
        theme === "light" ? "bg-main-light" : "bg-main-dark"
      } h-full bg-opacity-50 lg:border-r-4 lg:border-main-primary`}
    >
      <Image src={banner} alt="banner" className={`w-full p-2`} noRounded />

      <div className="w-full flex flex-col p-1 lg:p-2">
        {pages.map((p) => (
          <Linker
            key={`nav-${p.name}`}
            theme={theme}
            className="py-3 pl-24 rounded-lg w-full justify-start uppercase"
            color={
              currentPage === p.name.toLowerCase() ? "primary" : "secondary"
            }
            transparent
            to={`/${p.name.toLowerCase()}`}
            condition={currentPage !== p.name.toLowerCase()}
            title={p.name}
            icon={p.icon}
            noFill
            reverseIcon
          />
        ))}
      </div>
    </div>
  );
}
