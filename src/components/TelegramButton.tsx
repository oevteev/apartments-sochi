import { MessageCircle } from "lucide-react";

const TelegramButton = () => {
  return (
    <a
      href="https://t.me/SochiWaits"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#0088cc] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 animate-float"
      aria-label="Написать в Telegram"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  );
};

export default TelegramButton;
