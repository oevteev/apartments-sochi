import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold">ВашСочи</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Бронируйте квартиры посуточно в Сочи с гарантией качества и поддержкой 24/7. Лучшие апартаменты для вашего
              отдыха.
            </p>
          </div>

          {/* Navigation */}
          <nav role="navigation" aria-label="Навигация в подвале" className="space-y-4">
            <h3 className="text-lg font-semibold">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalog" className="text-muted-foreground hover:text-background transition-colors text-sm">
                  Каталог
                </Link>
              </li>
              <li>
                <Link
                  to="/apartments"
                  className="text-muted-foreground hover:text-background transition-colors text-sm"
                >
                  Апартаменты
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-background transition-colors text-sm">
                  О нас
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-background transition-colors text-sm">
                  Вопросы
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-muted-foreground hover:text-background transition-colors text-sm">
                  Отзывы
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contacts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Контакты</h3>
            <address className="space-y-3 not-italic">
              <div>
                <a
                  href="tel:+79952282874"
                  className="flex items-center gap-2 text-muted-foreground hover:text-background transition-colors text-sm"
                  aria-label="Позвонить по номеру +7 995 228-28-74"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  +7 (995) 228-28-74
                </a>
              </div>
              <div>
                <a
                  href="mailto:ArendaApartmentSochi@ya.ru"
                  className="flex items-center gap-2 text-muted-foreground hover:text-background transition-colors text-sm"
                  aria-label="Написать на email ArendaApartmentSochi@ya.ru"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  ArendaApartmentSochi@ya.ru
                </a>
              </div>
              <div>
                <span className="flex items-center gap-2 text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  Сочи, Россия
                </span>
              </div>
            </address>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Мы в соцсетях</h3>
            <div className="flex gap-3">
              <a
                href="https://vk.com/ArendaApartmentSochi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#0077FF] flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="Наша страница ВКонтакте"
              >
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.596-.19 1.365 1.26 2.179 1.818.616.422 1.084.33 1.084.33l2.178-.03s1.14-.07.599-.964c-.044-.073-.314-.661-1.618-1.869-1.366-1.263-1.183-1.058.462-3.242.999-1.328 1.398-2.139 1.273-2.485-.12-.33-.858-.243-.858-.243l-2.453.015s-.182-.025-.317.056c-.133.079-.218.263-.218.263s-.39 1.038-.91 1.92c-1.098 1.867-1.537 1.965-1.717 1.849-.418-.27-.313-1.086-.313-1.665 0-1.81.274-2.565-.534-2.762-.268-.066-.466-.109-1.153-.116-.88-.01-1.627.003-2.049.21-.281.137-.498.443-.366.46.163.022.532.1.728.364.253.34.244 1.104.244 1.104s.145 2.13-.339 2.394c-.332.182-.788-.189-1.767-1.886-.503-.87-.883-1.833-.883-1.833s-.073-.18-.204-.277c-.158-.117-.38-.154-.38-.154l-2.335.015s-.35.01-.479.163c-.114.135-.01.415-.01.415s1.838 4.302 3.92 6.469c1.907 1.987 4.072 1.857 4.072 1.857h.98z" />
                </svg>
              </a>
              <a
                href="https://t.me/WeInSochi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="Наш канал в Telegram"
              >
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-muted-foreground/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} ВашСочи. Все права защищены.</p>
            <div className="flex items-center gap-4">
              <Link to="/privacy-policy" className="hover:text-background transition-colors">
                Политика конфиденциальности
              </Link>
              <span aria-hidden="true">•</span>
              <span>Сделано с ❤️ для лучшего отдыха</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;