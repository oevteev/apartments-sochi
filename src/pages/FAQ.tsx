import Layout from "@/components/layout/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    category: "Бронирование",
    questions: [
      {
        question: "Как забронировать апартаменты?",
        answer:
          "Вы можете забронировать апартаменты через наш сайт, выбрав понравившийся объект в каталоге, или связавшись с нами напрямую по телефону или в Telegram. Мы поможем подобрать оптимальный вариант под ваши требования.",
      },
      {
        question: "Можно ли забронировать на несколько часов?",
        answer:
          "Минимальный срок бронирования — 1 сутки. Для почасовой аренды, пожалуйста, свяжитесь с нами для уточнения возможностей.",
      },
      {
        question: "За сколько дней нужно бронировать?",
        answer:
          "Рекомендуем бронировать заранее, особенно в высокий сезон (июнь-сентябрь). Однако мы постараемся найти для вас вариант даже при срочном бронировании.",
      },
    ],
  },
  {
    category: "Оплата",
    questions: [
      {
        question: "Какие способы оплаты доступны?",
        answer:
          "Мы принимаем оплату банковскими картами, переводом на карту или расчётный счёт, а также наличными при заселении. Предоплата составляет 50% от стоимости проживания.",
      },
      {
        question: "Нужно ли вносить залог?",
        answer:
          "Да, при заселении вносится возвратный залог в размере от 3000 до 10000 рублей в зависимости от объекта. Залог возвращается при выселении после проверки состояния апартаментов.",
      },
      {
        question: "Можно ли оплатить при заселении?",
        answer:
          "Полная оплата при заселении возможна только при наличии свободных мест. Для гарантированного бронирования требуется предоплата 50%.",
      },
    ],
  },
  {
    category: "Заселение и выселение",
    questions: [
      {
        question: "Во сколько заселение и выселение?",
        answer:
          "Стандартное время заселения — с 14:00, выселения — до 12:00. Раннее заселение или позднее выселение возможны по предварительной договорённости за дополнительную плату.",
      },
      {
        question: "Как получить ключи?",
        answer:
          "Ключи передаются лично при встрече на объекте. Наш представитель покажет апартаменты, расскажет о правилах проживания и ответит на все вопросы.",
      },
      {
        question: "Можно ли заселиться ночью?",
        answer:
          "Да, ночное заселение возможно по предварительной договорённости. За заселение после 23:00 может взиматься дополнительная плата.",
      },
    ],
  },
  {
    category: "Отмена и изменения",
    questions: [
      {
        question: "Как отменить бронирование?",
        answer:
          "Для отмены бронирования свяжитесь с нами по телефону или в Telegram. При отмене за 7 и более дней до заселения предоплата возвращается полностью. При отмене менее чем за 7 дней — возврат 50% предоплаты.",
      },
      {
        question: "Можно ли изменить даты бронирования?",
        answer:
          "Да, изменение дат возможно при наличии свободных мест. Свяжитесь с нами как можно раньше, и мы постараемся подобрать удобный вариант.",
      },
      {
        question: "Что делать, если изменились планы?",
        answer:
          "Позвоните нам или напишите в Telegram — мы всегда идём навстречу и стараемся найти оптимальное решение для каждого гостя.",
      },
    ],
  },
];

const FAQ = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Частые вопросы
            </h1>
            <p className="text-lg text-muted-foreground">
              Ответы на популярные вопросы о бронировании, оплате и проживании. 
              Не нашли ответ? Свяжитесь с нами!
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto space-y-12">
            {faqData.map((category) => (
              <div key={category.category}>
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

      {/* CTA */}
      <section className="py-16 bg-secondary/50">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
            Остались вопросы?
          </h2>
          <p className="text-muted-foreground mb-6">
            Мы с радостью ответим на все ваши вопросы
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+79952282874"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Позвонить
            </a>
            <a
              href="https://t.me/posutochnosochi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors"
            >
              Написать в Telegram
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
