import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import InputMask from "react-input-mask";
import useSpamProtection from "@/hooks/useSpamProtection";
import { useSmartCaptcha } from "@/hooks/useSmartCaptcha";
import { useRateLimiter } from "@/hooks/useRateLimiter";
import HoneypotField from "@/components/HoneypotField";
import { Send, Loader2 } from "lucide-react";

interface QuickContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QuickContactModal = ({ open, onOpenChange }: QuickContactModalProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [policyAgreed, setPolicyAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { honeypotValue, setHoneypotValue, honeypotFieldName, isSpam, resetTimer, getSpamReason } = useSpamProtection();
  const { containerRef, execute: executeCaptcha, isReady: isCaptchaReady } = useSmartCaptcha();
  const { checkLimit, recordAttempt, remaining, maxAttempts } = useRateLimiter("quick-contact");

  const resetForm = () => {
    setName("");
    setPhone("");
    setMessage("");
    setPolicyAgreed(false);
    resetTimer();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!name.trim()) {
      toast.error("Пожалуйста, введите ваше имя");
      return;
    }

    const cleanPhone = phone.replace(/[^0-9+]/g, "");
    if (cleanPhone.length < 11) {
      toast.error("Пожалуйста, введите корректный номер телефона");
      return;
    }

    if (!policyAgreed) {
      toast.error("Необходимо согласие с политикой обработки данных");
      return;
    }

    // Check spam protection
    if (isSpam()) {
      const reason = getSpamReason();
      console.warn("Spam detected:", reason);
      toast.error("Пожалуйста, заполните форму корректно");
      return;
    }

    // Check rate limit
    const limitCheck = checkLimit();
    if (!limitCheck.allowed) {
      toast.error(`Превышен лимит отправок. Осталось попыток: ${limitCheck.remaining}`);
      return;
    }

    setIsSubmitting(true);

    try {
      // Execute captcha
      const captchaToken = await executeCaptcha();

      if (!captchaToken) {
        toast.error("Ошибка проверки captcha. Попробуйте еще раз.");
        setIsSubmitting(false);
        return;
      }

      // Send to Telegram via edge function
      const { data, error } = await supabase.functions.invoke("send-to-telegram", {
        body: {
          name: name.trim(),
          phone: cleanPhone,
          message: message.trim() || undefined,
          formType: "quick-contact",
          captchaToken,
        },
      });

      if (error) {
        console.error("Error sending message:", error);
        toast.error("Ошибка отправки сообщения. Попробуйте позже.");
        return;
      }

      if (data?.error) {
        toast.error(data.error);
        return;
      }

      // Record successful attempt
      recordAttempt();

      toast.success("Сообщение отправлено! Мы свяжемся с вами в ближайшее время.");
      resetForm();
      onOpenChange(false);
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Произошла ошибка. Попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Быстрая связь
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <HoneypotField
            value={honeypotValue}
            onChange={setHoneypotValue}
            fieldName={honeypotFieldName}
          />

          <div>
            <Input
              type="text"
              placeholder="Ваше имя *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              className="w-full"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <InputMask
              mask="+7 (999) 999-99-99"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isSubmitting}
            >
              {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                <Input
                  {...inputProps}
                  type="tel"
                  placeholder="Телефон *"
                  className="w-full"
                />
              )}
            </InputMask>
          </div>

          <div>
            <Textarea
              placeholder="Сообщение (необязательно)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={1000}
              rows={3}
              className="w-full resize-none"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="policy-quick"
              checked={policyAgreed}
              onCheckedChange={(checked) => setPolicyAgreed(checked === true)}
              disabled={isSubmitting}
            />
            <label htmlFor="policy-quick" className="text-sm text-muted-foreground leading-tight">
              Я согласен с{" "}
              <Link
                to="/privacy-policy"
                target="_blank"
                className="text-primary hover:underline"
              >
                политикой обработки данных
              </Link>
            </label>
          </div>

          {/* Invisible SmartCaptcha container */}
          <div ref={containerRef} className="hidden" />

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !isCaptchaReady}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Отправка...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Отправить
              </>
            )}
          </Button>

          {remaining < maxAttempts && (
            <p className="text-xs text-muted-foreground text-center">
              Осталось попыток: {remaining} из {maxAttempts}
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuickContactModal;
