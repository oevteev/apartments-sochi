import { useEffect, useRef, useState } from "react";

interface RealtyCalendarWidgetProps {
  mode?: "search" | "full";
}

const RealtyCalendarWidget = ({ mode = "search" }: RealtyCalendarWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for lazy loading - improves INP
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Start loading 200px before visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Load widget only when visible
  useEffect(() => {
    if (!isVisible || initialized.current || mode === "full") return;

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
              (window as any).homereserve.initWidgetSearch({
                token: "9nyXMLUYKb",
                tag: "homereserve",
              });
            }
          }, 500);
        };

        initialized.current = true;
      } catch (error) {
        console.error("Failed to load RealtyCalendar widget:", error);
      }
    };

    loadWidget();
  }, [isVisible, mode]);

  if (mode === "full") {
    return (
      <div 
        ref={containerRef}
        className="w-full" 
        style={{ minHeight: "600px" }} // Reserve space to prevent CLS
      >
        {isVisible ? (
          <iframe
            src="https://homereserve.ru/9nyXMLUYKb?tag=homereserve"
            className="w-full h-[800px] border-0 rounded-lg"
            title="Каталог апартаментов"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
          />
        ) : (
          <div className="w-full h-[800px] bg-secondary/20 animate-pulse rounded-lg flex items-center justify-center">
            <span className="text-muted-foreground">Загрузка каталога...</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="w-full"
      style={{ minHeight: "180px" }} // Reserve space to prevent CLS
    >
      {isVisible ? (
        <div id="hr-widget" className="w-full" />
      ) : (
        <div className="w-full h-[100px] bg-secondary/20 animate-pulse rounded-lg" />
      )}
    </div>
  );
};

export default RealtyCalendarWidget;
