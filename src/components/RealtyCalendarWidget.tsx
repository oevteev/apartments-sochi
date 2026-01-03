import { useEffect, useRef } from "react";

interface RealtyCalendarWidgetProps {
  mode?: "search" | "full";
}

const RealtyCalendarWidget = ({ mode = "search" }: RealtyCalendarWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    
    const loadWidget = async () => {
      try {
        // Load the widget script
        const script = document.createElement("script");
        script.type = "module";
        script.src = "https://homereserve.ru/widget.js";
        document.head.appendChild(script);

        script.onload = () => {
          // Wait for the script to load and initialize
          setTimeout(() => {
            if ((window as any).homereserve) {
              if (mode === "search") {
                (window as any).homereserve.initWidgetSearch({
                  token: "9nyXMLUYKb",
                  tag: "homereserve",
                });
              }
            }
          }, 500);
        };

        initialized.current = true;
      } catch (error) {
        console.error("Failed to load RealtyCalendar widget:", error);
      }
    };

    loadWidget();
  }, [mode]);

  if (mode === "full") {
    return (
      <div className="w-full min-h-[600px]">
        <iframe
          src="https://homereserve.ru/9nyXMLUYKb?tag=homereserve"
          className="w-full h-[800px] border-0 rounded-lg"
          title="Каталог апартаментов"
        />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full">
      <div id="hr-widget" className="w-full" />
    </div>
  );
};

export default RealtyCalendarWidget;
