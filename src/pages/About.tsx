import Layout from "@/components/layout/Layout";
import { Phone, Mail, CreditCard, Banknote, Building2, MessageCircle } from "lucide-react";
import logoAbout from "@/assets/logo-about.png";
import avitoIcon from "@/assets/icons/avito.png";
import sutochnoIcon from "@/assets/icons/sutochno.png";
import ostrovokIcon from "@/assets/icons/ostrovok.png";
import cianIcon from "@/assets/icons/cian.png";
import yandexIcon from "@/assets/icons/yandex.png";
const About = () => {
  return <Layout>
      {/* Hero with Logo */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <img src={logoAbout} alt="ArendaApartmentSochi.ru" className="mx-auto mb-8 max-w-xs md:max-w-sm" />
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              ВашСочи — ваш надёжный партнёр в поиске идеального жилья для отдыха в Сочи.
              Мы работаем, чтобы каждый гость чувствовал себя как дома.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-background py-[10px]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
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
                зная, что их ждёт только лучший сервис.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Площадки бронирования */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-8">
              Мы представлены на площадках бронирования
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-8">
              <a href="https://www.avito.ru/brands/i10778160" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <img src={avitoIcon} alt="Avito" className="h-12 w-12 object-contain" />
              </a>
              <a href="https://sutochno.ru/front/searchapp/detail/1734459?host_id=5448483&host_device=PC&guest_id=5448483" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <img src={sutochnoIcon} alt="Суточно.ру" className="h-12 w-12 object-contain" />
              </a>
              <a href="https://ostrovok.ru/hotel/russia/sochi/mid13111434/v_zhk_yuzhnoye_more_flat/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <img src={ostrovokIcon} alt="Ostrovok" className="h-12 w-12 object-contain" />
              </a>
              <a href="https://cian.ru/rent/flat/300248141/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <img src={cianIcon} alt="Циан" className="h-12 w-12 object-contain" />
              </a>
              <a href="https://yandex.ru" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <img src={yandexIcon} alt="Яндекс" className="h-12 w-12 object-contain" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Реквизиты */}
      <section className="bg-secondary/30 py-[32px]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-8">
              Реквизиты
            </h2>
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft space-y-3 py-[16px]">
              <p className="text-foreground font-semibold text-lg">
                Индивидуальный предприниматель Евтеев Олег Владимирович
              </p>
              <div className="grid md:grid-cols-2 gap-3 text-muted-foreground">
                <p><span className="font-medium text-foreground">ИНН:</span> 500104030645</p>
                <p><span className="font-medium text-foreground">ОГРНИП:</span> 322508100259172</p>
                <p><span className="font-medium text-foreground">Р/С:</span> 40802810500003286175</p>
                <p><span className="font-medium text-foreground">К/С:</span> 30101810145250000974</p>
                <p><span className="font-medium text-foreground">БИК:</span> 044525974</p>
              </div>
              <p className="text-muted-foreground pt-2">
                <span className="font-medium text-foreground">Юр. адрес:</span> г. Сочи, Курортный проспект, д. 129
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Контакты */}
      <section className="bg-background py-[16px]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-8">
              Контакты
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <a href="tel:+79952282874" className="flex items-center gap-4 p-5 bg-card rounded-xl shadow-soft hover:shadow-card transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Телефон</div>
                  <div className="text-foreground font-semibold">+7(995)228-28-74</div>
                </div>
              </a>

              <a href="mailto:ArendaApartmentSochi@ya.ru" className="flex items-center gap-4 p-5 bg-card rounded-xl shadow-soft hover:shadow-card transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div className="text-foreground font-semibold">ArendaApartmentSochi@ya.ru</div>
                </div>
              </a>

              <a href="https://t.me/posutochnosochi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 bg-[#0088cc] text-white rounded-xl shadow-soft hover:opacity-90 transition-opacity sm:col-span-2">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-white/80 text-sm">Telegram</div>
                  <div className="font-semibold">Написать в Telegram</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Способы оплаты */}
      <section className="py-16 bg-secondary/30">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-8">
              Способы оплаты
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-4 p-5 bg-card rounded-xl shadow-soft">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-accent" />
                </div>
                <div className="text-foreground font-medium">СБП</div>
              </div>

              <div className="flex items-center gap-4 p-5 bg-card rounded-xl shadow-soft">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-accent" />
                </div>
                <div className="text-foreground font-medium">МИР / VISA / MASTER CARD</div>
              </div>

              <div className="flex items-center gap-4 p-5 bg-card rounded-xl shadow-soft">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Banknote className="w-6 h-6 text-accent" />
                </div>
                <div className="text-foreground font-medium">Наличные</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>;
};
export default About;