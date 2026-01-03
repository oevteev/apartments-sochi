import Layout from "@/components/layout/Layout";
import BookingForm from "@/components/BookingForm";
import RealtyCalendarWidget from "@/components/RealtyCalendarWidget";
import { Shield, FileCheck, HeadphonesIcon, MessageCircle } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Проверенное жильё",
    description: "Все апартаменты проходят тщательную проверку качества и соответствия описанию",
  },
  {
    icon: FileCheck,
    title: "Договор и гарантия",
    description: "Официальное оформление бронирования с гарантией возврата средств",
  },
  {
    icon: HeadphonesIcon,
    title: "Поддержка 24/7",
    description: "Круглосуточная помощь на всех этапах — от бронирования до выселения",
  },
  {
    icon: MessageCircle,
    title: "Быстрая связь",
    description: "Оперативные ответы в Telegram и по телефону для вашего удобства",
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center pt-20"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container-custom relative z-10 py-20">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 animate-fade-in">
              Квартиры с гарантией и поддержкой 24/7
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Бронируйте быстро, удобно и без лишних рисков. Лучшие апартаменты в Сочи для вашего идеального отдыха.
            </p>
            <div className="animate-fade-in flex justify-center" style={{ animationDelay: "0.4s" }}>
              <BookingForm />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/70 rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Почему выбирают нас
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Мы делаем всё, чтобы ваш отдых в Сочи был незабываемым
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group p-6 bg-card rounded-xl shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Widget Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Найдите идеальное жильё
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Используйте наш удобный поиск для подбора апартаментов по вашим критериям
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <RealtyCalendarWidget mode="search" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Готовы забронировать?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Свяжитесь с нами прямо сейчас, и мы поможем подобрать идеальный вариант для вашего отдыха
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+79952282874"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-colors"
            >
              Позвонить нам
            </a>
            <a
              href="https://t.me/posutochnosochi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Написать в Telegram
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
