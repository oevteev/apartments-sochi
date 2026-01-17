import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import RealtyCalendarWidget from "@/components/RealtyCalendarWidget";
import SEO from "@/components/SEO";

const Catalog = () => {
  return (
    <Layout>
      <SEO 
        title="Каталог апартаментов" 
        description="Выберите идеальное жильё для отдыха в Сочи. Все объекты проверены и соответствуют описанию. Бронирование онлайн."
      />
      <div className="pt-24 pb-12">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Каталог апартаментов
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Выберите идеальное жильё для вашего отдыха в Сочи. Все объекты проверены и соответствуют описанию.
            </p>
          </div>
        </div>
        <div className="container-custom">
          <RealtyCalendarWidget mode="full" />
        </div>

        {/* Cross-links Section */}
        <div className="container-custom mt-12">
          <div className="bg-secondary/30 rounded-2xl p-8 text-center">
            <p className="text-muted-foreground mb-4">
              Ещё не определились? Посмотрите{" "}
              <Link to="/apartments" className="text-primary hover:underline font-medium">
                фотогалерею и видеообзоры апартаментов
              </Link>{" "}
              или почитайте{" "}
              <Link to="/reviews" className="text-primary hover:underline font-medium">
                отзывы наших гостей
              </Link>
              .
            </p>
            <p className="text-muted-foreground">
              Есть вопросы по бронированию? Ответы найдёте в разделе{" "}
              <Link to="/faq" className="text-primary hover:underline font-medium">
                частых вопросов
              </Link>{" "}
              или{" "}
              <Link to="/contacts" className="text-primary hover:underline font-medium">
                свяжитесь с нами
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Catalog;