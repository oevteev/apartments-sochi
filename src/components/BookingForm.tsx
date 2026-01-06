import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import InputMask from "react-input-mask";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const BookingForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validation
    if (!name.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите ваше имя",
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

    if (!agreedToPolicy) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, согласитесь с политикой конфиденциальности",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Create message for Telegram
    const message = `Запрос информации по аренде от ${name.trim()}, телефон ${phone}, необходимо связаться для уточнения деталей. Информация принята роботом сайта`;
    const encodedMessage = encodeURIComponent(message);

    // Open Telegram with pre-filled message
    window.open(`https://t.me/SochiWaits?text=${encodedMessage}`, "_blank");

    toast({
      title: "Заявка принята!",
      description: "Сообщение отправлено в Telegram",
    });

    setName("");
    setPhone("");
    setAgreedToPolicy(false);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <Input
          type="text"
          placeholder="Ваше имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-12 bg-white/95 backdrop-blur border-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-accent"
        />
      </div>
      <div>
        <InputMask mask="+7 (999) 999-99-99" value={phone} onChange={(e) => setPhone(e.target.value)}>
          {(inputProps: any) => (
            <Input
              {...inputProps}
              type="tel"
              placeholder="+7 (000) 000-00-00"
              className="h-12 bg-white/95 backdrop-blur border-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-accent"
            />
          )}
        </InputMask>
      </div>

      <div className="flex items-start space-x-3">
        <Checkbox
          id="booking-privacy-policy"
          checked={agreedToPolicy}
          onCheckedChange={(checked) => setAgreedToPolicy(checked as boolean)}
          className="mt-0.5 border-white/50 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
        />
        <label htmlFor="booking-privacy-policy" className="text-sm text-white/90 leading-tight cursor-pointer">
          Отправляя данную форму, вы соглашаетесь{" "}
          <Link to="/privacy-policy" className="text-accent hover:underline">
            с политикой конфиденциальности
          </Link>
        </label>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base shadow-lg hover:shadow-xl transition-all"
      >
        {isSubmitting ? (
          "Отправка..."
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Забронировать
          </>
        )}
      </Button>
    </form>
  );
};

export default BookingForm;
