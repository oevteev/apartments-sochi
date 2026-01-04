import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold">ПосуточноСочи</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Бронируйте квартиры посуточно в Сочи с гарантией качества и
              поддержкой 24/7. Лучшие апартаменты для вашего отдыха.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Навигация</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/catalog"
                  className="text-muted-foreground hover:text-background transition-colors text-sm"
                >
                  Каталог
                </Link>
              </li>
              <li>
                <Link
                  to="/apartments"
                  className="text-muted-foreground hover:text-background transition-colors text-sm"
                >
                  Наши апартаменты
                </Link>
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-background transition-colors text-sm"
                >
                  О нас
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-muted-foreground hover:text-background transition-colors text-sm"
                >
                  Вопросы
                </Link>
              </li>
              <li>
                <Link
                  to="/reviews"
                  className="text-muted-foreground hover:text-background transition-colors text-sm"
                >
                  Отзывы
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Контакты</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+79952282874"
                  className="flex items-center gap-2 text-muted-foreground hover:text-background transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  +7 (995) 228-28-74
                </a>
              </li>
              <li>
                <a
                  href="mailto:arendasochiaparts@ya.ru"
                  className="flex items-center gap-2 text-muted-foreground hover:text-background transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  arendasochiaparts@ya.ru
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2 text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4" />
                  Сочи, Россия
                </span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Мы в соцсетях</h4>
            <div className="flex gap-3">
              <a
                href="https://t.me/posutochnosochi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="Telegram"
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-muted-foreground/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} ПосуточноСочи. Все права защищены.</p>
            <p>Сделано с ❤️ для лучшего отдыха</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
