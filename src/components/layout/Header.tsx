import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import MobileMenu from "./MobileMenu";
const navItems = [
  { name: "Каталог", path: "/catalog" },
  { name: "Апартаменты", path: "/apartments" },
  { name: "Вопросы", path: "/faq" },
  { name: "Отзывы", path: "/reviews" },
  { name: "Доверительное управление", path: "/management" },
  { name: "О нас", path: "/about" },
  { name: "Контакты", path: "/contacts" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerBg = isHomePage
    ? isScrolled
      ? "bg-white/95 backdrop-blur-md shadow-soft"
      : "bg-transparent"
    : "bg-white shadow-soft";

  const textColor = isHomePage && !isScrolled ? "text-white" : "text-foreground";
  const logoColor = isHomePage && !isScrolled ? "text-white" : "text-primary";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <span className={`text-xl font-serif font-bold transition-colors ${logoColor}`}>ВашСочи</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === item.path ? "text-primary" : textColor
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Contact Info - Desktop */}
            <div className={`hidden lg:flex items-center gap-6 ${textColor}`}>
              <a
                href="mailto:ArendaApartmentSochi@ya.ru"
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="hidden xl:inline">ArendaApartmentSochi@ya.ru</span>
              </a>
              <a
                href="tel:+79952282874"
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+7(995)228-28-74</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className={`lg:hidden ${textColor} hover:bg-white/20`}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} navItems={navItems} />
    </>
  );
};

export default Header;
