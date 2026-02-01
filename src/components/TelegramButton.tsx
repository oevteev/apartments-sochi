import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import QuickContactModal from "./QuickContactModal";
import maxIcon from "@/assets/icons/max.png";

const TelegramButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleIconClick = () => {
    setIsMenuOpen(false);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Menu with Telegram and MAX icons */}
      <div
        className={`fixed bottom-24 right-6 z-40 flex flex-col gap-3 transition-all duration-300 ${
          isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Telegram icon */}
        <button
          onClick={handleIconClick}
          className="w-12 h-12 bg-[#0088cc] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
          aria-label="Связаться через Telegram"
        >
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
          </svg>
        </button>

        {/* MAX icon */}
        <button
          onClick={handleIconClick}
          className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
          aria-label="Связаться через MAX"
        >
          <img src={maxIcon} alt="MAX" className="w-12 h-12 object-cover" />
        </button>
      </div>

      {/* Main toggle button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#0088cc] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 animate-float"
        aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню связи"}
      >
        {isMenuOpen ? (
          <X className="w-7 h-7 text-white" aria-hidden="true" />
        ) : (
          <MessageCircle className="w-7 h-7 text-white" aria-hidden="true" />
        )}
      </button>

      <QuickContactModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};

export default TelegramButton;
