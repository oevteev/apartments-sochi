import Layout from "@/components/layout/Layout";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Анна М.",
    date: "Декабрь 2025",
    rating: 5,
    text: "Отличные апартаменты в центре Сочи! Чисто, уютно, все как на фото. Хозяева очень отзывчивые, помогли с трансфером. Обязательно вернёмся!",
    apartment: "Апартаменты у моря",
  },
  {
    name: "Дмитрий К.",
    date: "Ноябрь 2025",
    rating: 5,
    text: "Бронировали на неделю, остались очень довольны. Квартира просторная, вид на море потрясающий. Поддержка отвечала на все вопросы мгновенно.",
    apartment: "Студия с видом на море",
  },
  {
    name: "Елена и Сергей",
    date: "Октябрь 2025",
    rating: 5,
    text: "Приезжали на отдых с детьми. Квартира полностью оборудована, есть всё необходимое. До пляжа 5 минут пешком. Спасибо за отличный отдых!",
    apartment: "Семейные апартаменты",
  },
  {
    name: "Михаил В.",
    date: "Сентябрь 2025",
    rating: 4,
    text: "Хорошее соотношение цены и качества. Заселение прошло быстро, квартира чистая. Единственное — хотелось бы парковку ближе.",
    apartment: "Апартаменты в центре",
  },
  {
    name: "Ольга П.",
    date: "Август 2025",
    rating: 5,
    text: "Уже третий раз бронируем через ВашСочи и всегда всё отлично! Надёжный сервис, честные описания, приятные цены.",
    apartment: "Премиум апартаменты",
  },
  {
    name: "Александр Н.",
    date: "Июль 2025",
    rating: 5,
    text: "Отдыхали с друзьями, сняли большую квартиру. Всё супер — современный ремонт, быстрый Wi-Fi, кондиционер работает отлично. Рекомендую!",
    apartment: "Апартаменты для компании",
  },
];

const Reviews = () => {
  const averageRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Отзывы гостей
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Читайте реальные отзывы наших гостей о проживании в апартаментах Сочи
            </p>
            <div className="inline-flex items-center gap-3 bg-card px-6 py-3 rounded-full shadow-soft">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 text-accent fill-accent"
                  />
                ))}
              </div>
              <span className="text-2xl font-bold text-foreground">
                {averageRating}
              </span>
              <span className="text-muted-foreground">
                на основе {reviews.length} отзывов
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col"
              >
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-primary/20 mb-4" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating
                          ? "text-accent fill-accent"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-foreground flex-1 mb-4 leading-relaxed">
                  "{review.text}"
                </p>

                {/* Author */}
                <div className="pt-4 border-t border-border">
                  <div className="font-semibold text-foreground">
                    {review.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {review.apartment} • {review.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
            Хотите оставить свой отзыв?
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
            Мы ценим обратную связь от каждого гостя. Напишите нам после вашего пребывания!
          </p>
          <a
            href="https://t.me/posutochnosochi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors"
          >
            Написать отзыв
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Reviews;
