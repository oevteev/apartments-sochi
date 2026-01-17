import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Phone, Mail } from "lucide-react";
import logoAbout from "@/assets/logo-about.png";
import { PaymentMethods } from "@/components/PaymentIcons";
import { BookingPlatforms } from "@/components/BookingPlatforms";

const About = () => {
  return (
    <Layout>
      <SEO
        title="О нас"
        description="ВашСочи — ваш надёжный партнёр в поиске идеального жилья для отдыха в Сочи. История компании, контакты и реквизиты."
      />
      {/* Hero with Logo */}
      <section id="about-hero" className="pt-32 pb-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <img src={logoAbout} alt="ArendaApartmentsSochi.ru" className="mx-auto mb-8 max-w-xs md:max-w-sm" />

            <p className="text-lg text-muted-foreground leading-relaxed">
              ВашСочи — ваш надёжный партнёр в поиске идеального жилья для отдыха в Сочи. Мы работаем, чтобы каждый
              гость чувствовал себя как дома.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section id="history" className="bg-background py-[10px]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-6">Наша история</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Мы начали свой путь с простой идеи — сделать аренду жилья в Сочи простой, безопасной и приятной для
                каждого гостя нашего прекрасного города.
              </p>
              <p>
                За годы работы мы собрали лучшие апартаменты, выстроили систему проверки качества и создали команду
                профессионалов, готовых помочь в любой ситуации.
              </p>
              <p>
                Сегодня сотни довольных клиентов выбирают нас для своего отдыха. Почитайте{" "}
                <Link to="/reviews" className="text-primary hover:underline font-medium">
                  отзывы наших гостей
                </Link>{" "}
                или{" "}
                <Link to="/catalog" className="text-primary hover:underline font-medium">
                  выберите апартаменты
                </Link>{" "}
                для вашего отдыха.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Площадки бронирования */}
      <section id="platforms" className="py-16 bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-8 text-left">
              Мы представлены на площадках бронирования
            </h2>
            <BookingPlatforms />
          </div>
        </div>
      </section>

      {/* Реквизиты */}
      <section id="details" className="bg-secondary/30 py-[32px]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-8">Реквизиты</h2>
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft space-y-3 py-[16px]">
              <p className="text-foreground font-semibold text-lg">
                Индивидуальный предприниматель Евтеев Олег Владимирович
              </p>
              <div className="grid md:grid-cols-2 gap-3 text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">ИНН:</span> 500104030645
                </p>
                <p>
                  <span className="font-medium text-foreground">ОГРНИП:</span> 322508100259172
                </p>
                <p>
                  <span className="font-medium text-foreground">Р/С:</span> 40802810500003286175
                </p>
                <p>
                  <span className="font-medium text-foreground">К/С:</span> 30101810145250000974
                </p>
                <p>
                  <span className="font-medium text-foreground">БИК:</span> 044525974
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Контакты */}
      <section id="contacts" className="bg-background py-[16px]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-8">Контакты</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <a
                href="tel:+79952282874"
                className="flex items-center gap-4 p-5 bg-card rounded-xl shadow-soft hover:shadow-card transition-shadow py-[10px]"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Телефон</div>
                  <div className="text-foreground font-semibold">+7(995)228-28-74</div>
                </div>
              </a>

              <a
                href="mailto:ArendaApartmentSochi@ya.ru"
                className="flex items-center gap-4 p-5 bg-card rounded-xl shadow-soft hover:shadow-card transition-shadow py-[10px]"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div className="text-foreground font-semibold">ArendaApartmentSochi@ya.ru</div>
                </div>
              </a>

              <Link
                to="/contacts"
                className="flex items-center justify-center gap-4 p-5 bg-primary text-primary-foreground rounded-xl shadow-soft hover:bg-primary/90 transition-colors sm:col-span-2"
              >
                <div className="font-semibold">Забронировать апартаменты</div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Способы оплаты */}
      <section id="payment" className="py-16 bg-secondary/30">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-8">Способы оплаты</h2>
            <PaymentMethods />
          </div>
        </div>
      </section>

      {/* Cross-links CTA */}
      <section className="py-12 bg-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground">
              Остались вопросы? Загляните в раздел{" "}
              <Link to="/faq" className="text-primary hover:underline font-medium">
                частых вопросов
              </Link>{" "}
              или посмотрите{" "}
              <Link to="/apartments" className="text-primary hover:underline font-medium">
                фотогалерею наших апартаментов
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default About;