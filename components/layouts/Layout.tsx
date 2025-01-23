import { ReactNode } from "react";
import Navbar from "../shared/Navbar";
import { Toaster } from "@/components/ui/sonner";
import Footer from "../shared/Footer";
interface LayoutProps {
  children: ReactNode;
}

import { useRouter } from "next/router";

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  return (
    <>
      <Toaster />
      <Navbar />
      <main>{children}</main>

      {/* if location / no footer */}
      {router.pathname !== "/" && <Footer />}
    </>
  );
}
