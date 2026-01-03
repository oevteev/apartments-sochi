import Layout from "@/components/layout/Layout";
import { Shield, Users, Award, Heart } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Надёжность",
    description: "Гарантируем качество каждого объекта и прозрачность сделки",
  },
  {
    icon: Users,
    title: "Клиентоориентированность",
    description: "Ваш комфорт и удовлетворённость — наш главный приоритет",
  },
  {
    icon: Award,
    title: "Профессионализм",
    description: "Многолетний опыт на рынке краткосрочной аренды в Сочи",
  },
  {
    icon: Heart,
    title: "Забота",
    description: "Поддержка 24/7 на всех этапах вашего пребывания",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section
        className="pt-32 pb-20 bg-gradient-to-br from-primary/10 to-accent/10"
      >
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              О нас
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              ПосуточноСочи — ваш надёжный партнёр в поиске идеального жилья для отдыха в Сочи. 
              Мы работаем, чтобы каждый гость чувствовал себя как дома.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
                Наша история
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Мы начали свой путь с простой идеи — сделать аренду жилья в Сочи 
                  простой, безопасной и приятной для каждого гостя нашего прекрасного города.
                </p>
                <p>
                  За годы работы мы собрали лучшие апартаменты, выстроили систему 
                  проверки качества и создали команду профессионалов, готовых помочь 
                  в любой ситуации.
                </p>
                <p>
                  Сегодня сотни довольных клиентов выбирают нас для своего отдыха, 
                  зная, что с ПосуточноСочи их ждёт только лучший сервис.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Сочи"
                className="rounded-2xl shadow-card w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm">Довольных гостей</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Наши ценности
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Принципы, которыми мы руководствуемся каждый день
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-6 bg-card rounded-xl shadow-soft text-center hover:shadow-card transition-all duration-300"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Наши апартаменты
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Каждый объект — это уникальное пространство для вашего комфортного отдыха
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            ].map((src, index) => (
              <div
                key={index}
                className="aspect-[4/3] rounded-xl overflow-hidden group"
              >
                <img
                  src={src}
                  alt={`Апартаменты ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
