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
      </div>
    </Layout>
  );
};

export default Catalog;
