import React from "react";
import Image from "next/image";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
const Footer = () => {
  return (
    <>
      <div className="text-black/50 text-[1vw] text-right pb-4 w-11/12 mx-auto flex flex-col items-center gap-5 mt-20 mb-2">
        <div className="w-24">
          <Image
            src="https://web.forestdev.work/logo.png"
            alt="image"
            width={200}
            height={24}
            priority={false}
          />
        </div>

        <div className=" flex flex-col md:flex-row items-center gap-3 md:gap-6 text-lg md:text-sm">
          <div className="flex items-center gap-6">
            <a
              target="_blank"
              className=" border aspect-square p-1 border-black/40 hover:bg-zinc-300"
              href="https://www.facebook.com/profile.php?id=61553365438301&locale=zh_TW"
            >
              <FaFacebookF />
            </a>
            <a
              target="_blank"
              className=" border aspect-square p-1 border-black/40 hover:bg-zinc-300"
              href="https://www.instagram.com/dayu_arch/"
            >
              <FaInstagram />
            </a>
          </div>
          <div className="flex items-center gap-2">
            <FaPhoneAlt size={10} />
            TEL 04-2329 9298
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt size={10} />
            408台中市南屯區公益路二段51號13樓B2室
          </div>
          <div>copyright, 2024 All Right Reserved.</div>
        </div>
      </div>
    </>
  );
};

export default Footer;
