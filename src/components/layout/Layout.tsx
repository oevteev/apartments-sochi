import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import TelegramButton from "@/components/TelegramButton";
import CookieConsent from "@/components/CookieConsent";
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
      {/* Skip link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded"
      >
        Перейти к основному содержимому
      </a>
      <Header />
      <Breadcrumbs />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
      <TelegramButton />
      <CookieConsent />
    </div>
  );
};

export default Layout;