import Layout from "@/components/layout/Layout";
import BookingForm from "@/components/BookingForm";
import RealtyCalendarWidget from "@/components/RealtyCalendarWidget";
import { Shield, FileCheck, HeadphonesIcon, MessageCircle, Play, ExternalLink, ChevronDown, Star, Quote } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import heroBackground from "@/assets/heroback.jpg";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Import apartment images
import apart1 from "@/assets/aparts/apart-1.jpg";
import apart2 from "@/assets/aparts/apart-2.jpg";
import apart3 from "@/assets/aparts/apart-3.jpg";
import apart4 from "@/assets/aparts/apart-4.jpg";
import apart5 from "@/assets/aparts/apart-5.jpg";
import apart6 from "@/assets/aparts/apart-6.jpg";
import apart7 from "@/assets/aparts/apart-7.jpg";
import apart8 from "@/assets/aparts/apart-8.jpg";
import apart9 from "@/assets/aparts/apart-9.jpg";
import apart10 from "@/assets/aparts/apart-10.jpg";
import apart11 from "@/assets/aparts/apart-11.jpg";
import apart12 from "@/assets/aparts/apart-12.jpg";

const initialImages = [apart1, apart2, apart4, apart5, apart6, apart7];
const moreImages = [apart8, apart9, apart10, apart11, apart12, apart3];

const youtubeLinks = [
  { title: "Обзор апартаментов #1", url: "https://www.youtube.com/watch?v=OyPPxZljnn8&list=PL1pioUiTzsoM9R2saGt3zUaShWn6-_XmM&index=6" },
  { title: "Обзор апартаментов #2", url: "https://www.youtube.com/watch?v=bbqdhV1IZ9E&list=PL1pioUiTzsoM9R2saGt3zUaShWn6-_XmM&index=7" },
  { title: "Обзор апартаментов #3", url: "https://www.youtube.com/watch?v=Xz3mTWyJFXE&list=PL1pioUiTzsoM9R2saGt3zUaShWn6-_XmM&index=8" },
  { title: "Обзор апартаментов #4", url: "https://www.youtube.com/watch?v=tJ1Bq4YLydo&list=PL1pioUiTzsoM9R2saGt3zUaShWn6-_XmM&index=4" },
  { title: "Обзор апартаментов #5", url: "https://www.youtube.com/watch?v=OyPPxZljnn8&list=PL1pioUiTzsoM9R2saGt3zUaShWn6-_XmM" },
];

const rutubeLinks = [
  { title: "Обзор апартаментов #1", url: "https://rutube.ru/video/private/003db7881ecdc6570aa200634ff26487/?p=jlnIpPI_ZoCOYA-WSfFC4A&playlist=1161435" },
  { title: "Обзор апартаментов #2", url: "https://rutube.ru/video/private/c737d7b4fa3b961088aa3c3e0d62da6f/?p=gqxpaLM9Iqobd27n3h09aw&playlist=1161435" },
  { title: "Обзор апартаментов #3", url: "https://rutube.ru/video/private/8ccfee5a318e22499aeb86444a1d429e/?p=yztm3p6MyOpL6hYqcot2Iw&playlist=1161435" },
  { title: "Обзор апартаментов #4", url: "https://rutube.ru/video/private/003db7881ecdc6570aa200634ff26487/?p=jlnIpPI_ZoCOYA-WSfFC4A" },
  { title: "Обзор апартаментов #5", url: "https://rutube.ru/video/private/c737d7b4fa3b961088aa3c3e0d62da6f/?p=gqxpaLM9Iqobd27n3h09aw" },
];

const faqData = [
  {
    category: "Бронирование",
    questions: [
      { question: "Как забронировать квартиру?", answer: "Вы можете забронировать квартиру через наш каталог, заполнив форму на сайте, позвонив по телефону +7(995)228-28-74 или написав нам в Telegram." },
      { question: "Можно ли отменить бронь и вернуть деньги?", answer: "За 2 недели до заезда – возврат 100%. За неделю – индивидуально по согласованию. Менее чем за 7 дней – бронь невозвратная." },
    ],
  },
  {
    category: "Заселение и выезд",
    questions: [
      { question: "Во сколько заезд и выезд?", answer: "Стандартный заезд – после 14:00, выезд – до 12:00. Возможен ранний заезд и поздний выезд – только по предварительной договоренности." },
      { question: "Как проходит заселение?", answer: "Все квартиры оборудованы smart замками. Вы получаете видеоинструкцию и подробную информацию по заселению." },
    ],
  },
  {
    category: "Оплата",
    questions: [
      { question: "Какая предоплата?", answer: "Предоплата – 20% от стоимости проживания. Вносится при бронировании." },
      { question: "Какой залог?", answer: "При заселении оплачивается залог от порчи имущества в размере 6000 руб. Залог возвращается при выезде." },
    ],
  },
];

const reviews = [
  {
    name: "Денис",
    date: "13 ноября 2025 г.",
    rating: 5,
    text: "Всё прекрасно! Олег приятный порядочный человек, пунктуальный, подсказал как лучше добраться до разных мест, так как мы первый раз в Сочи. Всё что на фото соответствует действительности. Никаких проблем не возникло. Однозначно рекомендую!",
  },
  {
    name: "Николай",
    date: "7 ноября 2025 г.",
    rating: 5,
    text: "Квартира супер! Очень здорово продуман интерьер - дизайнеру респект. Прекрасно отметили с супругой 25 лет совместной жизни. Вид прекрасный, все рассветы и закаты были наши - просто фантастика. Олегу отдельно спасибо за всё. Рекомендую!",
  },
  {
    name: "Эльвира",
    date: "22 октября 2025 г.",
    rating: 5,
    text: "Обустроенная, комфортная квартира. Но главное: это шикарный вид из окон, и восход и закат! Просто можно не выходить из квартиры и релаксировать. Олег всегда на связи, все рассказал, подсказал. Рекомендую на сто процентов!",
  },
  {
    name: "Зарина",
    date: "14 октября 2025 г.",
    rating: 5,
    text: "Очень красивая и хорошая квартира, все соответствует фотографиям тут. Хозяин дома приятный человек, легко нашли общий язык. Вид из квартиры просто супер. Залог при выезде возвращается. Рекомендую!",
  },
  {
    name: "Ольга",
    date: "5 июля 2025 г.",
    rating: 5,
    text: "Еще раз хочу поблагодарить Олега и его супругу за отдых!!! Заселили раньше, все рассказал, показал, такой гостеприимный, добрый, отзывчивый человек!!!! А роскошный панорамный вид на море - это нужно видеть! ОДНОЗНАЧНО РЕКОМЕНДУЮ!",
  },
  {
    name: "Татьяна",
    date: "26 апреля 2025 г.",
    rating: 5,
    text: "Чудесная квартира, вид не передать словами, спишь на море, ешь на море, смотришь на море. Чувствуешь себя очень классно в ней. Есть все необходимое. Все как на фото. С удовольствием приедем еще.",
  },
];

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
  const [showMore, setShowMore] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const displayedImages = showMore ? [...initialImages, ...moreImages] : initialImages;

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center pt-20"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%), url('${heroBackground}')`,
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

      {/* Apartments Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Наши апартаменты
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Роскошные апартаменты с панорамным видом на море
            </p>
          </div>

          {/* Photo Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {displayedImages.map((image, index) => (
              <div
                key={index}
                className="aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group relative"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`Апартаменты - фото ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </div>

          {!showMore && moreImages.length > 0 && (
            <div className="text-center mb-12">
              <Button onClick={() => setShowMore(true)} variant="outline" size="lg" className="gap-2">
                <ChevronDown className="w-5 h-5" />
                Показать ещё
              </Button>
            </div>
          )}

          {/* Video Links */}
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif font-semibold text-foreground mb-6 text-center">Видеообзоры</h3>
            <Accordion type="single" collapsible className="space-y-3">
              {/* YouTube Accordion */}
              <AccordionItem value="youtube" className="bg-card rounded-xl border border-border shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                      <Play className="w-4 h-4 text-white fill-white" />
                    </div>
                    <span className="font-semibold text-foreground">YouTube</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="space-y-2">
                    {youtubeLinks.map((video, index) => (
                      <a
                        key={index}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors group"
                      >
                        <Play className="w-4 h-4 text-red-600" />
                        <span className="flex-1 text-sm text-foreground">{video.title}</span>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-red-600 transition-colors" />
                      </a>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* RuTube Accordion */}
              <AccordionItem value="rutube" className="bg-card rounded-xl border border-border shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#00A8E1] rounded-lg flex items-center justify-center">
                      <Play className="w-4 h-4 text-white fill-white" />
                    </div>
                    <span className="font-semibold text-foreground">RuTube</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="space-y-2">
                    {rutubeLinks.map((video, index) => (
                      <a
                        key={index}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors group"
                      >
                        <Play className="w-4 h-4 text-[#00A8E1]" />
                        <span className="flex-1 text-sm text-foreground">{video.title}</span>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-[#00A8E1] transition-colors" />
                      </a>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Отзывы наших гостей
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Узнайте, что говорят о нас наши клиенты
            </p>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {reviews.map((review, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-card rounded-xl p-6 shadow-soft h-full flex flex-col">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-primary/20 mb-3" />
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">
                      {review.text}
                    </p>
                    <div className="border-t border-border pt-4">
                      <p className="font-semibold text-foreground">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Частые вопросы
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ответы на популярные вопросы о бронировании и проживании
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-10">
            {faqData.map((category) => (
              <div key={category.category}>
                <h3 className="text-xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-1 bg-primary rounded-full" />
                  {category.category}
                </h3>
                <Accordion type="single" collapsible className="space-y-3">
                  {category.questions.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`${category.category}-${index}`}
                      className="bg-card rounded-xl px-6 border border-border shadow-sm"
                    >
                      <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-5">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-5">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
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

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          {selectedImage && (
            <img src={selectedImage} alt="Апартаменты - увеличенное фото" className="w-full h-auto rounded-lg" />
          )}
        </DialogContent>
      </Dialog>

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
