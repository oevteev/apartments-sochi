import { useState, FormEvent } from "react";
import InputMask from "react-input-mask";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const BookingForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
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

    setIsSubmitting(true);

    // Simulate submission (will be replaced with actual backend later)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Заявка принята!",
      description: "Мы свяжемся с вами в ближайшее время",
    });

    setName("");
    setPhone("");
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
        <InputMask
          mask="+7 (999) 999-99-99"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        >
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
