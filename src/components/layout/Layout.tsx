import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import TelegramButton from "@/components/TelegramButton";
import Breadcrumbs from "@/components/Breadcrumbs";
import { usePageTracking } from "@/hooks/usePageTracking";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  // Track page views for statistics
  usePageTracking();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumbs />
      <main className="flex-1">{children}</main>
      <Footer />
      <TelegramButton />
    </div>
  );
};

export default Layout;
