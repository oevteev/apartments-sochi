import { useState } from "react";
import { MessageCircle } from "lucide-react";
import QuickContactModal from "./QuickContactModal";

const TelegramButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#0088cc] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 animate-float"
        aria-label="Открыть форму быстрой связи"
      >
        <MessageCircle className="w-7 h-7 text-white" aria-hidden="true" />
      </button>

      <QuickContactModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};

export default TelegramButton;
