import { useState } from "react";
import Layout from "@/components/layout/Layout";
import RealtyCalendarWidget from "@/components/RealtyCalendarWidget";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Play, ExternalLink, ChevronDown } from "lucide-react";

// Import apartment images
import apart1 from "@/assets/aparts/apart-1.jpg";
import apart2 from "@/assets/aparts/apart-2.jpg";
import apart3 from "@/assets/aparts/apart-3.jpg";
import apart4 from "@/assets/aparts/apart-4.jpg";
import apart5 from "@/assets/aparts/apart-5.jpg";
import apart6 from "@/assets/aparts/apart-6.jpg";
import apart7 from "@/assets/aparts/apart-7.jpg";
import apart8 from "@/assets/aparts/apart-8.jpg";
import apart9 from "@/assets/aparts/apart-9.jpg";

const initialImages = [apart1, apart2, apart3, apart4, apart5, apart6];
const moreImages = [apart7, apart8, apart9];

const videoLinks = [
  {
    platform: "YouTube",
    url: "https://youtube.com",
    title: "Обзор апартаментов на YouTube",
  },
  {
    platform: "Rutube",
    url: "https://rutube.ru",
    title: "Обзор апартаментов на Rutube",
  },
];

const Apartments = () => {
  const [showMore, setShowMore] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const displayedImages = showMore
    ? [...initialImages, ...moreImages]
    : initialImages;

  return (
    <Layout>
      <div className="pt-24 pb-12">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Наши апартаменты
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Роскошные апартаменты с панорамным видом на море. Комфорт и уют для вашего незабываемого отдыха в Сочи.
            </p>
          </div>

          {/* RealtyCalendar Widget */}
          <section className="mb-16">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-6 text-center">
              Забронировать апартаменты
            </h2>
            <RealtyCalendarWidget mode="search" />
          </section>

          {/* Photo Gallery */}
          <section className="mb-16">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-6 text-center">
              Фотогалерея
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedImages.map((image, index) => (
                <div
                  key={index}
                  className="aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group relative"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`Апартаменты - фото ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              ))}
            </div>

            {/* Show More Button */}
            {!showMore && moreImages.length > 0 && (
              <div className="text-center mt-8">
                <Button
                  onClick={() => setShowMore(true)}
                  variant="outline"
                  size="lg"
                  className="gap-2"
                >
                  <ChevronDown className="w-5 h-5" />
                  Показать ещё
                </Button>
              </div>
            )}
          </section>

          {/* Video Links */}
          <section className="mb-16">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-6 text-center">
              Видеообзоры
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {videoLinks.map((video, index) => (
                <a
                  key={index}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 bg-card rounded-xl shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors">
                    <Play className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">
                      {video.platform}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {video.title}
                    </p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Апартаменты - увеличенное фото"
              className="w-full h-auto rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Apartments;
