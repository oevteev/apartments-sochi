import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqData = [
  {
    category: "Бронирование",
    id: "booking",
    questions: [
      {
        question: "Как забронировать квартиру?",
        answer: (
          <>
            Вы можете забронировать квартиру через наш{" "}
            <Link to="/catalog" className="text-primary hover:underline font-medium">
              каталог апартаментов
            </Link>
            , заполнив форму на сайте, позвонив по телефону +7(995)228-28-74 или{" "}
            <Link to="/contacts" className="text-primary hover:underline font-medium">
              написав нам
            </Link>{" "}
            в Telegram.
          </>
        ),
      },
      {
        question: "Можно ли отменить бронь и вернуть деньги?",
        answer:
          "За 2 недели до заезда – возврат 100%. За неделю – индивидуально по согласованию. Менее чем за 7 дней – бронь невозвратная. Мы держим квартиру под вашу дату и несем убытки при отмене.",
      },
      {
        question: "С кем заключается договор?",
        answer:
          "Договор оформляется с нашей управляющей компанией (ИП). Вы бронируете напрямую – без посредников и собственников.",
      },
    ],
  },
  {
    category: "Заселение и выезд",
    id: "checkin",
    questions: [
      {
        question: "Какие документы нужны для заселения?",
        answer: "Для заселения необходим паспорт РФ. Для иностранных граждан - загранпаспорт и миграционная карта.",
      },
      {
        question: "Во сколько заезд и выезд?",
        answer:
          "Стандартный заезд – после 14:00, выезд – до 12:00. Возможен ранний заезд и поздний выезд – только по предварительной договоренности с администратором и за доплату.",
      },
      {
        question: "Возможно ли заехать пораньше?",
        answer: "Да, если апартамент свободен и не занят другими гостями. Обязательно уточняйте заранее.",
      },
      {
        question: "Как проходит заселение?",
        answer:
          "Все квартиры оборудованы smart замками. Вы получаете видеоинструкцию и подробную информацию по заселению.",
      },
    ],
  },
  {
    category: "Оплата",
    id: "payment",
    questions: [
      {
        question: "Какая предоплата?",
        answer: "Предоплата – 20% от стоимости проживания. Вносится при бронировании.",
      },
      {
        question: "Какой залог?",
        answer:
          "При заселении оплачивается залог (депозит) от порчи имущества в размере 6000 руб. Залог возвращается при выезде, если в апартаменте ничего не сломано и не разбито.",
      },
    ],
  },
  {
    category: "Проживание",
    id: "stay",
    questions: [
      {
        question: "Что входит в стоимость проживания?",
        answer:
          "Кухня с посудой; WI-FI; Постельное белье; Техника (телевизор, кондиционер, стиральная машина, бойлер, фен, утюг/отпариватель); Полотенца (кроме пляжных); Средства гигиены",
      },
      {
        question: "Заселение с детьми разрешено?",
        answer: "Разрешено, если ребенок старше 12 лет.",
      },
      {
        question: "Можно ли с животными?",
        answer: "Нет, запрещено.",
      },
      {
        question: "В квартирах можно курить?",
        answer:
          "Нет, строго запрещено. Курение в апартаментах не допускается. Штраф за курение в апартаментах - 6000 руб.",
      },
      {
        question: "Есть ли бесплатная автостоянка для гостей?",
        answer: "Да, для большинства апартаментов гостям предоставляется бесплатная автостоянка у дома",
      },
      {
        question: "Возможна ли длительная аренда?",
        answer: "Да, возможна длительная аренда сроком до 11 месяцев. Цену и сроки аренды уточняйте у администратора.",
      },
    ],
  },
];

const FAQ = () => {
  return (
    <Layout>
      <SEO
        title="Частые вопросы"
        description="Ответы на популярные вопросы о бронировании апартаментов в Сочи. Информация об оплате, заселении и проживании."
      />
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">Частые вопросы</h1>
            <p className="text-lg text-muted-foreground">
              Ответы на популярные вопросы о бронировании, оплате и проживании. Не нашли ответ?{" "}
              <Link to="/contacts" className="text-primary hover:underline font-medium">
                Свяжитесь с нами
              </Link>
              !
            </p>
          </div>
        </div>
      </section>

      {/* Anchor Navigation */}
      <nav aria-label="Категории вопросов" className="py-6 bg-secondary/30 sticky top-20 z-40 border-b border-border">
        <div className="container-custom">
          <ul className="flex flex-wrap justify-center gap-4 text-sm">
            {faqData.map((category) => (
              <li key={category.id}>
                <a
                  href={`#${category.id}`}
                  className="px-4 py-2 rounded-full bg-card hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
                >
                  {category.category}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* FAQ */}
      <section className="bg-background py-[10px]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto space-y-12">
            {faqData.map((category) => (
              <div key={category.category} id={category.id}>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6 flex items-center gap-3">
                  <span className="w-10 h-1 bg-primary rounded-full" />
                  {category.category}
                </h2>
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
                      <AccordionContent className="text-muted-foreground pb-5">{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-links Section */}
      <section className="py-12 bg-secondary/30">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground mb-6">
              Хотите узнать больше о наших апартаментах? Посмотрите{" "}
              <Link to="/apartments" className="text-primary hover:underline font-medium">
                фотогалерею и видеообзоры
              </Link>{" "}
              или почитайте{" "}
              <Link to="/reviews" className="text-primary hover:underline font-medium">
                отзывы гостей
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary/50">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Остались вопросы?</h2>
          <p className="text-muted-foreground mb-6">Мы с радостью ответим на все ваши вопросы</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contacts"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Задать вопрос менеджеру
            </Link>
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-card text-foreground font-semibold rounded-lg hover:bg-secondary transition-colors border border-border"
            >
              Выбрать апартаменты
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default FAQ;
