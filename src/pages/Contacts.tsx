import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import InputMask from "react-input-mask";
import useSpamProtection from "@/hooks/useSpamProtection";
import useSmartCaptcha from "@/hooks/useSmartCaptcha";
import useRateLimiter from "@/hooks/useRateLimiter";
import HoneypotField from "@/components/HoneypotField";
import { supabase } from "@/integrations/supabase/client";

const contactInfo = [
  {
    icon: Phone,
    label: "Телефон",
    value: "+7(995)228-28-74",
    href: "tel:+79952282874",
  },
  {
    icon: Mail,
    label: "Email",
    value: "ArendaApartmentSochi@ya.ru",
    href: "mailto:ArendaApartmentSochi@ya.ru",
  },
  {
    icon: MapPin,
    label: "Адрес",
    value: "г. Сочи, Россия",
    href: null,
  },
  {
    icon: Clock,
    label: "Режим работы",
    value: "9:00 - 19:00 (мск.)",
    href: null,
  },
];

const Contacts = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    honeypotValue,
    setHoneypotValue,
    honeypotFieldName,
    isSpam,
    getSpamReason,
    resetTimer,
  } = useSpamProtection();

  const { containerRef, execute: executeCaptcha, reset: resetCaptcha, isReady: captchaReady } = useSmartCaptcha();
  const { checkLimit, recordAttempt, remaining } = useRateLimiter('contact');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Check rate limit first
    const limitCheck = checkLimit();
    if (!limitCheck.allowed) {
      toast({
        title: "Превышен лимит",
        description: "Вы отправили слишком много сообщений. Попробуйте через час.",
        variant: "destructive",
      });
      return;
    }

    // Spam protection check
    if (isSpam()) {
      const reason = getSpamReason();
      console.warn("Spam detected:", reason);
      
      if (reason === "too_fast") {
        toast({
          title: "Подождите",
          description: "Пожалуйста, заполните форму внимательнее",
          variant: "destructive",
        });
        return;
      }
      
      // Silent fail for honeypot (don't reveal detection)
      toast({
        title: "Сообщение отправлено!",
        description: "Мы свяжемся с вами в ближайшее время",
      });
      setName("");
      setPhone("");
      setMessage("");
      setAgreedToPolicy(false);
      resetTimer();
      return;
    }

    // Validation
    const trimmedName = name.trim();
    const uniqueChars = new Set(trimmedName.toLowerCase().replace(/\s/g, '')).size;
    if (!trimmedName || uniqueChars < 5) {
      toast({
        title: "Ошибка",
        description: "Имя должно содержать минимум 5 различных символов",
        variant: "destructive",
      });
      return;
    }
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 11) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите корректный номер телефона",
        variant: "destructive",
      });
      return;
    }
    const trimmedMessage = message.trim();
    if (trimmedMessage.length < 10) {
      toast({
        title: "Ошибка",
        description: "Сообщение должно содержать минимум 10 символов",
        variant: "destructive",
      });
      return;
    }
    if (!agreedToPolicy) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, согласитесь с политикой конфиденциальности",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);

    try {
      // Execute SmartCaptcha
      let captchaToken = "";
      try {
        captchaToken = await executeCaptcha();
      } catch (captchaError) {
        console.error("Captcha error:", captchaError);
        toast({
          title: "Ошибка",
          description: "Не удалось пройти проверку. Попробуйте снова",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      const { error } = await supabase.functions.invoke('send-to-telegram', {
        body: {
          name: name.trim(),
          phone: phone.trim(),
          message: message.trim(),
          formType: 'contact',
          captchaToken,
        },
      });

      if (error) {
        throw error;
      }

      // Record successful attempt for rate limiting
      recordAttempt();

      toast({
        title: "Сообщение отправлено!",
        description: "Мы свяжемся с вами в ближайшее время",
      });

      setName("");
      setPhone("");
      setMessage("");
      setAgreedToPolicy(false);
      resetTimer();
      resetCaptcha();
    } catch (error) {
      console.error('Error sending contact message:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось отправить сообщение. Попробуйте позже или напишите в Telegram",
        variant: "destructive",
      });
      resetCaptcha();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <SEO 
        title="Контакты" 
        description="Свяжитесь с нами для бронирования апартаментов в Сочи. Телефон, email, Telegram. Работаем 9:00-19:00 по московскому времени."
        noIndex
      />
      {/* Hero */}
      <section className="pt-32 pb-8 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Контакты
            </h1>
            <p className="text-lg text-muted-foreground">
              Свяжитесь с нами для бронирования апартаментов в Сочи
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-background py-[10px]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="bg-card rounded-2xl p-8 shadow-card h-fit">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-8">Наши контакты</h2>

              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">{item.label}</div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-foreground font-medium hover:text-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-foreground font-medium">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Cross-links */}
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-muted-foreground text-sm">
                  Перед обращением рекомендуем посмотреть раздел{" "}
                  <Link to="/faq" className="text-primary hover:underline font-medium">
                    частых вопросов
                  </Link>
                  . Также вы можете{" "}
                  <Link to="/catalog" className="text-primary hover:underline font-medium">
                    выбрать апартаменты
                  </Link>{" "}
                  самостоятельно.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card rounded-2xl p-8 shadow-card">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-2">Напишите нам</h2>
              <p className="text-muted-foreground mb-8">Заполните форму, и мы свяжемся с вами в ближайшее время</p>

              <form onSubmit={handleSubmit} className="space-y-5 relative">
                {/* Honeypot field - invisible to humans */}
                <HoneypotField
                  value={honeypotValue}
                  onChange={setHoneypotValue}
                  fieldName={honeypotFieldName}
                />

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Ваше имя</label>
                  <Input
                    type="text"
                    placeholder="Как к вам обращаться?"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Телефон</label>
                  <InputMask mask="+7 (999) 999-99-99" value={phone} onChange={(e) => setPhone(e.target.value)}>
                    {(inputProps: any) => (
                      <Input {...inputProps} type="tel" placeholder="+7 (000) 000-00-00" className="h-12" />
                    )}
                  </InputMask>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Сообщение</label>
                  <Textarea
                    placeholder="Опишите ваш вопрос или пожелания..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="resize-none"
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="privacy-policy"
                    checked={agreedToPolicy}
                    onCheckedChange={(checked) => setAgreedToPolicy(checked as boolean)}
                    className="mt-0.5"
                  />
                  <label
                    htmlFor="privacy-policy"
                    className="text-sm text-muted-foreground leading-tight cursor-pointer"
                  >
                    Отправляя данную форму, вы соглашаетесь{" "}
                    <Link to="/privacy-policy" className="text-primary hover:underline">
                      с политикой обработки персональных данных
                    </Link>
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !captchaReady || remaining === 0}
                  className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base"
                >
                  {isSubmitting ? (
                    "Отправка..."
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Отправить сообщение
                    </>
                  )}
                </Button>

                {/* Remaining attempts indicator */}
                {remaining < 5 && (
                  <p className={`text-xs text-center ${remaining === 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {remaining === 0 
                      ? "Лимит исчерпан. Попробуйте через час." 
                      : `Осталось попыток: ${remaining} из 5`}
                  </p>
                )}
                
                {/* SmartCaptcha invisible container */}
                <div ref={containerRef} />
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contacts;