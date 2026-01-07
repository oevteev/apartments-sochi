import React from 'react';

// Avito - зелёный логотип
const AvitoIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 120 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="110" height="30" rx="6" fill="#00AAFF"/>
    <text x="60" y="26" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="Arial">Avito</text>
  </svg>
);

// Суточно.ру - жёлто-синий логотип
const SutochnoIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 120 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="110" height="30" rx="6" fill="#FFB800"/>
    <text x="60" y="26" textAnchor="middle" fill="#1A1A1A" fontSize="12" fontWeight="bold" fontFamily="Arial">Суточно.ру</text>
  </svg>
);

// Ostrovok - оранжево-красный логотип
const OstrovokIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 120 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="110" height="30" rx="6" fill="#FF5722"/>
    <text x="60" y="26" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial">Ostrovok</text>
  </svg>
);

// Циан - синий логотип
const CianIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 120 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="110" height="30" rx="6" fill="#0468FF"/>
    <text x="60" y="26" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="Arial">ЦИАН</text>
  </svg>
);

// Яндекс Путешествия - красно-белый логотип
const YandexIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 120 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="110" height="30" rx="6" fill="#FC3F1D"/>
    <text x="60" y="26" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial">Яндекс</text>
  </svg>
);

interface BookingPlatformProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const BookingPlatform = ({ icon, label, href }: BookingPlatformProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex flex-col items-center gap-3 p-4 bg-card rounded-xl shadow-soft hover:shadow-card hover:scale-105 transition-all"
  >
    <div className="w-24 h-10">
      {icon}
    </div>
    <span className="text-sm font-medium text-foreground text-center">{label}</span>
  </a>
);

const bookingPlatforms = [
  {
    icon: <AvitoIcon className="w-full h-full" />,
    label: "Avito",
    href: "https://www.avito.ru/brands/i10778160"
  },
  {
    icon: <SutochnoIcon className="w-full h-full" />,
    label: "Суточно.ру",
    href: "https://sutochno.ru/front/searchapp/detail/1734459?host_id=5448483&host_device=PC&guest_id=5448483"
  },
  {
    icon: <OstrovokIcon className="w-full h-full" />,
    label: "Ostrovok",
    href: "https://ostrovok.ru/hotel/russia/sochi/mid13111434/v_zhk_yuzhnoye_more_flat/"
  },
  {
    icon: <CianIcon className="w-full h-full" />,
    label: "Циан",
    href: "https://cian.ru/rent/flat/300248141/"
  },
  {
    icon: <YandexIcon className="w-full h-full" />,
    label: "Яндекс Путешествия",
    href: "https://yandex.ru"
  }
];

export const BookingPlatforms = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
    {bookingPlatforms.map((platform) => (
      <BookingPlatform
        key={platform.label}
        icon={platform.icon}
        label={platform.label}
        href={platform.href}
      />
    ))}
  </div>
);
