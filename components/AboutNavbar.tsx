import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";

type NavItem = {
  href: string;
  label: string;
  enLabel: string;
};

const navItems: NavItem[] = [
  { href: "/brand", label: "企業精神", enLabel: "Brand" },
  { href: "/history", label: "關係企業", enLabel: "Company" },
  { href: "/partners", label: "協力廠商", enLabel: "Partners" },
];

export function AboutNavbar() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex gap-12 py-10"
    >
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="relative flex flex-col items-center"
        >
          <div
            className={`bg-black h-[3px] mb-2 transition-all duration-300 ${
              router.pathname === item.href ? "w-[20px]" : "w-[0px]"
            }`}
          />
          <div
            className={`hover:text-black transition-all duration-300 ${
              router.pathname === item.href ? "text-black" : "text-black/60"
            } font-bold`}
          >
            {item.label}
          </div>
          <div className="text-black text-sm">{item.enLabel}</div>
        </Link>
      ))}
    </motion.div>
  );
}
