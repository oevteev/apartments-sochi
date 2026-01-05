import Layout from "@/components/layout/Layout";
import { CheckCircle, Sparkles, Shield, FileText, Clock, Star, Users, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
const reasons = [{
  icon: Sparkles,
  title: "Чистота и профессиональные регулярные уборки",
  description: "После каждого выезда производится профессиональная уборка по стандартам гостиничного сервиса. Генеральная уборка производится по мере необходимости, но не менее одного раза в месяц."
}, {
  icon: Shield,
  title: "Устранение технических поломок в квартирах",
  description: "У нас в штате работает мастер, который в состоянии починить сантехнику, электрику, сделает все, чтобы в квартире все было исправно."
}, {
  icon: Clock,
  title: "Своевременные выплаты",
  description: "Выплаты производятся вовремя и регулярно в соответствии с агентским договором."
}, {
  icon: FileText,
  title: "Отчетность",
  description: "Полный и понятный отчет для собственника."
}, {
  icon: Star,
  title: "Постоянные улучшения",
  description: "От каждого гостя мы собираем обратную связь, чтобы постоянно улучшать качество наших услуг. Средний рейтинг на площадках бронирования 4,8 — мы любим и ценим каждого гостя!"
}];
const Management = () => {
  return <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-secondary via-background to-secondary/50 py-[80px]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4 animate-fade-in">
              Для собственников квартир и инвесторов
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-2 animate-slide-up">
              Уважаемые собственники, приветствуем вас на нашем сайте
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-background py-0">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Card className="border-none shadow-card bg-card overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
                    <Users className="w-12 h-12 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4 text-center md:text-left">
                      Меня зовут Евтеев Олег Владимирович
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4 text-justify">
                      Я являюсь основателем компании ВашСочи по аренде апартаментов. Наша компания занимается сервисом
                      по аренде и обслуживанию квартир и апартаментов с 2022 года.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4 text-justify">
                      Мы работаем в сфере управления недвижимостью на территории Центрального Сочи. В нашем управлении
                      квартиры разного уровня: от среднего до люкс апартаментов.
                    </p>
                    <p className="font-medium leading-relaxed text-justify text-primary">
                      Наша компания предлагает вам партнерское сотрудничество. Мы развиваем сеть краткосрочной,
                      среднесрочной аренды квартир на территории Сочи. Предлагаем вам заключить агентский договор на
                      передачу вашего объекта недвижимости в управление нашей компании.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partnership Section */}

      {/* 5 Reasons Section */}
      <section className="bg-background py-[6px]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              5 причин сотрудничать с нашей компанией
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {reasons.map((reason, index) => <Card key={index} className="border-none shadow-card bg-card card-hover group">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <reason.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{reason.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed text-left">{reason.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-px">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground text-center mb-12">
              Наше предложение
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-none shadow-card bg-card overflow-hidden">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <Home className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-foreground mb-4">Суть предложения</h3>
                  <p className="text-muted-foreground leading-relaxed text-justify">
                    Рынок аренды — это целый отдельный бизнес, а для вас это пассивный доход. С нами вы будете
                    зарабатывать в среднем на <span className="text-primary font-semibold">10% выше рынка</span>{" "}
                    абсолютно не вникая в процессы, так как мы умеем правильно упаковать и презентовать вашу
                    недвижимость.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-card bg-card overflow-hidden">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-foreground mb-4">Форма сотрудничества</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Мы заключаем с вами агентский договор, вы оснащаете квартиру по нашему чек-листу. Всё просто и
                    прозрачно!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Income Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8">Сколько можно с нами заработать?</h2>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 mb-8">
              <div className="text-6xl md:text-7xl font-bold mb-4">75%</div>
              <p className="text-lg opacity-90 leading-relaxed md:text-lg">
                Ваш доход — это 75% от чистой выручки за вычетом расходов на уборку, стирку, расходники для гостей,
                мелкий ремонт и наценки с сайтов бронирования.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-2">Стоимость услуг</h3>
                <p className="text-3xl font-bold">25%</p>
                <p className="opacity-80">от чистой прибыли</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-2">Выплаты</h3>
                <p className="text-lg opacity-90">
                  1 раз в месяц после согласования отчета, переводом на расчетный счет
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-background py-[10px]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              Готовы начать сотрудничество?
            </h2>
            <p className="text-muted-foreground mb-8 text-base">
              Свяжитесь с нами, чтобы обсудить детали передачи вашей недвижимости в управление
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-primary text-lg px-8">
                <Link to="/contacts">Связаться с нами</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>;
};
export default Management;