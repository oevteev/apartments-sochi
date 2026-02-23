import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie_consent");
    if (!accepted) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border p-4 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-muted-foreground">
        <p className="text-center sm:text-left">
          Продолжая использовать сайт, вы соглашаетесь на обработку файлов cookies и{" "}
          <Link to="/privacy-policy" className="text-primary underline underline-offset-2 hover:text-primary/80">
            политикой обработки персональных данных
          </Link>
        </p>
        <Button size="sm" onClick={handleAccept} className="shrink-0">
          ДА
        </Button>
      </div>
    </div>
  );
};

export default CookieConsent;
