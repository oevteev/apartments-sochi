import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight, Home } from "lucide-react";

const routeNames: Record<string, string> = {
  "/": "Главная",
  "/catalog": "Каталог",
  "/apartments": "Апартаменты",
  "/about": "О нас",
  "/faq": "Вопросы и ответы",
  "/reviews": "Отзывы",
  "/contacts": "Контакты",
  "/management": "Управление недвижимостью",
  "/privacy-policy": "Политика конфиденциальности",
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Don't show breadcrumbs on homepage
  if (location.pathname === "/") {
    return null;
  }

  const breadcrumbItems = [
    { name: "Главная", path: "/" },
    ...pathnames.map((_, index) => {
      const path = `/${pathnames.slice(0, index + 1).join("/")}`;
      return {
        name: routeNames[path] || path,
        path,
      };
    }),
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://arendaapartmentssochi.ru${item.path}`,
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <nav aria-label="Хлебные крошки" className="container-custom py-4">
        <ol className="flex items-center flex-wrap gap-1 text-sm text-muted-foreground">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;

            return (
              <li key={item.path} className="flex items-center">
                {index > 0 && <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground/50" />}
                {isLast ? (
                  <span className="text-foreground font-medium" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link to={item.path} className="flex items-center gap-1 hover:text-primary transition-colors">
                    {index === 0 && <Home className="w-4 h-4" />}
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
