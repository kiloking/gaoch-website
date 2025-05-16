"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { frontNavLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa";
import { ChevronDown, Dot, X } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const worksPattern = /^\/works\/w\d+$/;
  const type =
    pathname === "/" || worksPattern.test(pathname)
      ? "home"
      : pathname === "/brand" || pathname === "/history"
      ? "brand"
      : "page";
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const [isClosing, setIsClosing] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    const waitForCssLoad = setTimeout(() => {
      setIsMobile(window.innerWidth < 768);
    }, 100); // 100ms 等待时间

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(waitForCssLoad);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      toggleMenu();
    }, 300); // 與動畫時長相同
  };

  return (
    <>
      {isMobile ? (
        <div className="relative z-20">
          <div className="flex justify-between items-center p-4  text-black">
            <Link href="/" className="text-xl font-bold">
              <Image
                src="https://web.forestdev.work/gaoch/logo03.svg"
                alt="logo"
                width={280}
                height={24}
                priority={false}
              />
            </Link>
            <div
              onClick={toggleMenu}
              className={`focus:outline-none ${
                type === "home" ? "text-white" : "text-black"
              }`}
            >
              <FaBars />
            </div>
          </div>
          {(menuOpen || isClosing) && (
            <>
              <div
                className={`fixed inset-0 bg-black/20`}
                onClick={handleClose}
              />
              <div
                className={`fixed top-0 left-0 w-[85%] h-full bg-gradient-to-b from-white to-gray-50 shadow-2xl ${
                  isClosing ? "animate-slideOut" : "animate-slideIn"
                }`}
              >
                <div className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4">
                  <h2 className="text-xl font-semibold text-gray-800">選單</h2>
                  <div
                    onClick={handleClose}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200"
                  >
                    <X className="text-xl text-gray-600" />
                  </div>
                </div>

                <div className="p-4">
                  <ul className="space-y-1">
                    {frontNavLinks.map((item, index) => (
                      <li key={`mobile-nav-${index}`}>
                        <Link
                          href={item.route}
                          className={`flex items-center px-4 py-3 rounded-xl hover:bg-white/80 active:bg-gray-100 gap-2 text-gray-800 font-bold`}
                          onClick={handleClose}
                        >
                          <span>{item.label}</span>
                          {item.sub && <ChevronDown size={16} />}
                        </Link>
                        {item.sub && (
                          <ul className="mt-1 ml-4 space-y-1">
                            {item.sub.map((subitem, subindex) => (
                              <li key={`mobile-subnav-${subindex}`}>
                                <Link
                                  href={subitem.route}
                                  className={`flex items-center px-4 py-2.5 rounded-lg hover:bg-white/80 active:bg-gray-100 text-gray-600 `}
                                  onClick={handleClose}
                                >
                                  <span className="text-md">
                                    {subitem.label}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
                  <div className="text-sm text-gray-500 text-center">
                    © 2025 高誠事業
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="z-20 absolute top-0  bg-black/0 w-full flex items-center justify-between   px-12 pt-10 pb-6 space-x-10 group/navbarC">
          {type === "home" && (
            <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b via-black/20 from-black/50 transition-all opacity-0 group-hover/navbarC:opacity-100 -z-10 pointer-events-none"></div>
          )}
          <Link href="/" className="w-full">
            {type === "home" ? (
              <Image
                src="https://web.forestdev.work/gaoch/logo03.svg"
                alt="image"
                width={400}
                height={24}
                priority={false}
              />
            ) : (
              <Image
                src="https://web.forestdev.work/gaoch/logo03.svg"
                alt="image"
                width={400}
                height={24}
                priority={false}
              />
            )}
          </Link>

          <ul
            className={`flex flex-center w-[80%] justify-center space-x-10  bg-black/70  border-b border-white/30 rounded-full backdrop-blur-m  ${
              type === "home" ? "text-white " : " text-black "
            } `}
            style={{
              boxShadow: "2px 5px 10px 2px rgba(0, 0, 0, 0.3)",
            }}
          >
            {frontNavLinks.map((item, index) => {
              const whiteTextPages = ["home", "brand", "history"];
              return (
                <li
                  key={`navtitle` + index}
                  className={`group relative dropdown px-4 py-2 text-lg ${
                    whiteTextPages.includes(type)
                      ? "text-white/80"
                      : "text-white/80"
                  }`}
                >
                  <a
                    href={item.route}
                    className={`${
                      type === "home"
                        ? "hover:text-white "
                        : " hover:text-white "
                    } `}
                  >
                    {item.label}
                  </a>
                  {item.sub && (
                    <div className="group-hover:block dropdown-menu absolute hidden h-auto left-1/2 -translate-x-1/2  ">
                      <ul className="top-0 bg-black/70 shadow px-6 py-6 w-auto  ">
                        {item.sub.map((subitem, index) => {
                          return (
                            <li key={`navsub` + index} className="py-1">
                              <Link
                                href={subitem.route}
                                className="block text-white/80 font-bold break-keep  hover:text-white cursor-pointer"
                              >
                                {subitem.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
