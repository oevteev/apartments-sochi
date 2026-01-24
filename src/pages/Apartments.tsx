import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import RealtyCalendarWidget from "@/components/RealtyCalendarWidget";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Play, ExternalLink, ChevronDown } from "lucide-react";

// Import apartment images with WebP optimization
import apart1 from "@/assets/aparts/apart-1.jpg?format=webp";
import apart2 from "@/assets/aparts/apart-2.jpg?format=webp";
import apart3 from "@/assets/aparts/apart-3.jpg?format=webp";
import apart4 from "@/assets/aparts/apart-4.jpg?format=webp";
import apart5 from "@/assets/aparts/apart-5.jpg?format=webp";
import apart6 from "@/assets/aparts/apart-6.jpg?format=webp";
import apart7 from "@/assets/aparts/apart-7.jpg?format=webp";
import apart8 from "@/assets/aparts/apart-8.jpg?format=webp";
import apart9 from "@/assets/aparts/apart-9.jpg?format=webp";
import apart10 from "@/assets/aparts/apart-10.jpg?format=webp";
import apart11 from "@/assets/aparts/apart-11.jpg?format=webp";
import apart12 from "@/assets/aparts/apart-12.jpg?format=webp";
import apart13 from "@/assets/aparts/apart-13.jpg?format=webp";
import apart14 from "@/assets/aparts/apart-14.jpg?format=webp";
import apart15 from "@/assets/aparts/apart-15.jpg?format=webp";
import apart16 from "@/assets/aparts/apart-16.jpg?format=webp";
import apart17 from "@/assets/aparts/apart-17.jpg?format=webp";
import apart18 from "@/assets/aparts/apart-18.jpg?format=webp";
import apart19 from "@/assets/aparts/apart-19.jpg?format=webp";
import apart20 from "@/assets/aparts/apart-20.jpg?format=webp";
import apart21 from "@/assets/aparts/apart-21.jpg?format=webp";
import apart22 from "@/assets/aparts/apart-22.jpg?format=webp";

const initialImages = [apart1, apart2, apart4, apart5, apart6, apart7];
const moreImages = [
  apart8,
  apart9,
  apart10,
  apart11,
  apart12,
  apart3,
  apart13,
  apart14,
  apart15,
  apart16,
  apart17,
  apart18,
  apart19,
  apart20,
  apart21,
  apart22,
];

const youtubeLinks = [
  {
    title: "Квартира 46 м2, ЖК 'Южное море', корпус 1",
    url: "https://www.youtube.com/watch?v=OyPPxZljnn8&list=PL1pioUiTzsoM9R2saGt3zUaShWn6-_XmM&index=6",
  },
  {
    title: "Квартира 45 м2, ЖК 'Южное море', корпус 1",
    url: "https://www.youtube.com/watch?v=bbqdhV1IZ9E&list=PL1pioUiTzsoM9R2saGt3zUaShWn6-_XmM&index=7",
  },
  {
    title: "Квартира 45 м2, ЖК 'Южное море', корпус 1",
    url: "https://www.youtube.com/watch?v=Xz3mTWyJFXE&list=PL1pioUiTzsoM9R2saGt3zUaShWn6-_XmM&index=8",
  },
  {
    title: "Квартира 45 м2, ЖК 'Южное море', корпус 1",
    url: "https://www.youtube.com/watch?v=tJ1Bq4YLydo&list=PL1pioUiTzsoM9R2saGt3zUaShWn6-_XmM&index=4",
  },
  {
    title: "Квартира 49 м2, ЖК 'Южное море', корпус 2",
    url: "https://www.youtube.com/watch?v=OyPPxZljnn8&list=PL1pioUiTzsoM9R2saGt3zUaShWn6-_XmM",
  },
];

const rutubeLinks = [
  {
    title: "Квартира 46 м2, ЖК 'Южное море', корпус 1",
    url: "https://rutube.ru/video/private/003db7881ecdc6570aa200634ff26487/?p=jlnIpPI_ZoCOYA-WSfFC4A&playlist=1161435",
  },
  {
    title: "Квартира 45 м2, ЖК 'Южное море', корпус 1",
    url: "https://rutube.ru/video/private/c737d7b4fa3b961088aa3c3e0d62da6f/?p=gqxpaLM9Iqobd27n3h09aw&playlist=1161435",
  },
  {
    title: "Квартира 45 м2, ЖК 'Южное море', корпус 1",
    url: "https://rutube.ru/video/private/8ccfee5a318e22499aeb86444a1d429e/?p=yztm3p6MyOpL6hYqcot2Iw&playlist=1161435",
  },
  {
    title: "Квартира 45 м2, ЖК 'Южное море', корпус 1",
    url: "https://rutube.ru/video/private/003db7881ecdc6570aa200634ff26487/?p=jlnIpPI_ZoCOYA-WSfFC4A",
  },
  {
    title: "Квартира 49 м2, ЖК 'Южное море', корпус 2",
    url: "https://rutube.ru/video/private/c737d7b4fa3b961088aa3c3e0d62da6f/?p=gqxpaLM9Iqobd27n3h09aw",
  },
];

const Apartments = () => {
  const [showMore, setShowMore] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const displayedImages = showMore ? [...initialImages, ...moreImages] : initialImages;

  return (
    <Layout>
      <SEO
        title="Апартаменты"
        description="Уютные апартаменты с панорамным видом на море в Сочи. Фотогалерея, видеообзоры и онлайн-бронирование."
      />
      <div className="pt-24 pb-12">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Наши апартаменты</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Роскошные апартаменты с панорамным видом на море. Комфорт и уют для вашего незабываемого отдыха в Сочи.
            </p>
          </div>

          {/* Anchor Navigation */}
          <nav aria-label="Навигация по странице" className="mb-12">
            <ul className="flex flex-wrap justify-center gap-4 text-sm">
              <li>
                <a
                  href="#booking"
                  className="px-4 py-2 rounded-full bg-card hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
                >
                  Бронирование
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="px-4 py-2 rounded-full bg-card hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
                >
                  Фотогалерея
                </a>
              </li>
              <li>
                <a
                  href="#videos"
                  className="px-4 py-2 rounded-full bg-card hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
                >
                  Видеообзоры
                </a>
              </li>
            </ul>
          </nav>

          {/* RealtyCalendar Widget */}
          <section id="booking" className="mb-16">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-6 text-center">
              Забронировать апартаменты
            </h2>
            <RealtyCalendarWidget mode="search" />
          </section>

          {/* Photo Gallery */}
          <section id="gallery" className="mb-16">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-6 text-center">Фотогалерея</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedImages.map((image, index) => (
                <div
                  key={index}
                  className="aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group relative"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`Интерьер апартаментов в Сочи с видом на море - фото ${index + 1}`}
                    width={800}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              ))}
            </div>

            {/* Show More Button */}
            {!showMore && moreImages.length > 0 && (
              <div className="text-center mt-8">
                <Button onClick={() => setShowMore(true)} variant="outline" size="lg" className="gap-2">
                  <ChevronDown className="w-5 h-5" />
                  Показать ещё фотографии
                </Button>
              </div>
            )}
          </section>

          {/* Video Links */}
          <section id="videos" className="mb-16">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-6 text-center">Видеообзоры</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* YouTube */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                    <Play className="w-4 h-4 text-white fill-white" />
                  </div>
                  YouTube
                </h3>
                <div className="space-y-3">
                  {youtubeLinks.map((video, index) => (
                    <a
                      key={index}
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-card rounded-xl shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 group"
                    >
                      <div className="w-10 h-10 bg-red-600/10 rounded-lg flex items-center justify-center group-hover:bg-red-600 transition-colors">
                        <Play className="w-5 h-5 text-red-600 group-hover:text-white transition-colors" />
                      </div>
                      <span className="flex-1 font-medium text-foreground">{video.title}</span>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-red-600 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Rutube */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#00A8E1] rounded-lg flex items-center justify-center">
                    <Play className="w-4 h-4 text-white fill-white" />
                  </div>
                  Rutube
                </h3>
                <div className="space-y-3">
                  {rutubeLinks.map((video, index) => (
                    <a
                      key={index}
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-card rounded-xl shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 group"
                    >
                      <div className="w-10 h-10 bg-[#00A8E1]/10 rounded-lg flex items-center justify-center group-hover:bg-[#00A8E1] transition-colors">
                        <Play className="w-5 h-5 text-[#00A8E1] group-hover:text-white transition-colors" />
                      </div>
                      <span className="flex-1 font-medium text-foreground">{video.title}</span>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-[#00A8E1] transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section with Cross-links */}
          <section className="bg-secondary/30 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Готовы забронировать?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Выберите даты и забронируйте апартаменты онлайн или свяжитесь с нами для консультации
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Link
                to="/catalog"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                Выбрать даты и забронировать
              </Link>
              <Link
                to="/contacts"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-card text-foreground font-semibold rounded-lg hover:bg-secondary transition-colors border border-border"
              >
                Связаться с нами
              </Link>
            </div>
            <p className="text-muted-foreground text-sm">
              Есть вопросы? Загляните в раздел{" "}
              <Link to="/faq" className="text-primary hover:underline font-medium">
                частых вопросов
              </Link>{" "}
              или почитайте{" "}
              <Link to="/reviews" className="text-primary hover:underline font-medium">
                отзывы наших гостей
              </Link>
              .
            </p>
          </section>
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          {selectedImage && (
            <img src={selectedImage} alt="Апартаменты - увеличенное фото" className="w-full h-auto rounded-lg" />
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Apartments;
