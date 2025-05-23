import React from "react";
import Image from "next/image";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaLine,
  FaTiktok,
} from "react-icons/fa";
const Footer = () => {
  return (
    <>
      <div className="text-black/50 text-[1vw] text-right pb-8 w-12/12 mx-auto flex flex-col items-center gap-5 pt-14  bg-zinc-200 ">
        <div className="w-[70%] md:w-[20%]">
          <Image
            src="https://web.forestdev.work/gaoch/logo03.svg"
            alt="logo"
            width={400}
            height={24}
            priority={false}
          />
        </div>

        <div className=" flex flex-col md:flex-row items-center gap-3 md:gap-6 text-lg md:text-sm">
          <div className="flex items-center gap-6">
            <a
              target="_blank"
              className=" border aspect-square p-1 border-[#1877F2]/40 hover:bg-zinc-300 text-[#1877F2] "
              href="https://www.facebook.com/profile.php?id=100064837400096"
            >
              <FaFacebookF />
            </a>
            <a
              target="_blank"
              className=" border aspect-square p-1 border-[#DD2A7B]/40 hover:bg-zinc-300 text-[#DD2A7B]"
              href="https://www.instagram.com/gaochengcareer"
            >
              <FaInstagram />
            </a>
            <a
              target="_blank"
              className=" border aspect-square p-1 border-[#06C755]/40 hover:bg-zinc-300 text-[#06C755]"
              href="https://lin.ee/2zWXnUM"
            >
              <FaLine />
            </a>
            <a
              target="_blank"
              className=" border aspect-square p-1 border-[#010101]/40 hover:bg-zinc-300 text-[#010101]"
              href="https://www.tiktok.com/@gaochengcareer"
            >
              <FaTiktok />
            </a>
          </div>
          <div className="flex items-center gap-2">
            <FaPhoneAlt size={10} />
            TEL 03-470-6501
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt size={10} />
            325桃園市龍潭區工二路一段96巷11號
          </div>
          <div>copyright 2025 All Right Reserved.</div>
        </div>
      </div>
    </>
  );
};

export default Footer;
