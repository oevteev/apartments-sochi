import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Eagerly load first 3 images for LCP
import hero1 from "@/assets/hero/hero-1.jpg";
import hero2 from "@/assets/hero/hero-2.jpg";
import hero3 from "@/assets/hero/hero-3.jpg";

// Initial images loaded immediately
const initialHeroImages = [hero1, hero2, hero3];

// Lazy load remaining images
const lazyImageLoaders = [
  () => import("@/assets/hero/hero-4.jpg"),
  () => import("@/assets/hero/hero-5.jpg"),
  () => import("@/assets/hero/hero-6.jpg"),
  () => import("@/assets/hero/hero-7.jpg"),
  () => import("@/assets/hero/hero-8.jpg"),
  () => import("@/assets/hero/hero-9.jpg"),
  () => import("@/assets/hero/hero-10.jpg"),
  () => import("@/assets/hero/hero-11.jpg"),
  () => import("@/assets/hero/hero-12.jpg"),
  () => import("@/assets/hero/hero-13.jpg"),
  () => import("@/assets/hero/hero-14.jpg"),
];

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [heroImages, setHeroImages] = useState<string[]>(initialHeroImages);
  const ticking = useRef(false);
  const imagesLoaded = useRef(false);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Optimized scroll handler with requestAnimationFrame throttling
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lazy load remaining images after initial render
  useEffect(() => {
    if (imagesLoaded.current) return;
    
    const loadRemainingImages = async () => {
      try {
        const loaded = await Promise.all(
          lazyImageLoaders.map(async (loader) => {
            const module = await loader();
            return module.default;
          })
        );
        setHeroImages([...initialHeroImages, ...loaded]);
        imagesLoaded.current = true;
      } catch (error) {
        console.error("Failed to load hero images:", error);
      }
    };

    // Load after 2 seconds to not block LCP
    const timer = setTimeout(loadRemainingImages, 2000);
    return () => clearTimeout(timer);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  }, [heroImages.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  }, [heroImages.length]);

  const parallaxOffset = scrollY * 0.4;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {heroImages.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: index === currentIndex ? 1 : 0,
            transform: `translateY(${parallaxOffset}px) scale(1.1)`,
            willChange: index === currentIndex ? "opacity, transform" : "auto",
          }}
          aria-hidden={index !== currentIndex}
        >
          <img
            src={image}
            alt={`Роскошный интерьер апартаментов с панорамным видом на море в Сочи - фото ${index + 1}`}
            width={1920}
            height={1080}
            loading={index === 0 ? "eager" : "lazy"}
            decoding={index === 0 ? "sync" : "async"}
            fetchPriority={index === 0 ? "high" : "auto"}
            className="absolute inset-[-10%] w-[120%] h-[120%] object-cover"
          />
        </div>
      ))}
      
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Navigation arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all duration-300 backdrop-blur-sm"
        aria-label="Показать предыдущее фото апартаментов"
      >
        <ChevronLeft size={32} aria-hidden="true" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all duration-300 backdrop-blur-sm"
        aria-label="Показать следующее фото апартаментов"
      >
        <ChevronRight size={32} aria-hidden="true" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Перейти к слайду ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
