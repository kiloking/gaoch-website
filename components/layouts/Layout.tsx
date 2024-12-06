import { ReactNode } from "react";
import Navbar from "../shared/Navbar";
import { Toaster } from "@/components/ui/sonner";
interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Toaster />
      <Navbar />
      <main>{children}</main>
    </>
  );
}
