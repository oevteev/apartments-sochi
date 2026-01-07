import React from 'react';

// СБП (Система быстрых платежей) - официальные цвета
export const SBPIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 5L65 12.5V27.5L50 35L35 27.5V12.5L50 5Z" fill="#1E88E5"/>
    <path d="M50 5L65 12.5L50 20L35 12.5L50 5Z" fill="#42A5F5"/>
    <path d="M50 20V35L35 27.5V12.5L50 20Z" fill="#0D47A1"/>
    <text x="50" y="38" textAnchor="middle" fill="#1E88E5" fontSize="8" fontWeight="bold" fontFamily="Arial">СБП</text>
  </svg>
);

// МИР - зелёный градиент
export const MirIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mirGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0F9D58"/>
        <stop offset="50%" stopColor="#4285F4"/>
        <stop offset="100%" stopColor="#DB4437"/>
      </linearGradient>
    </defs>
    <rect x="10" y="8" width="80" height="24" rx="4" fill="#0F9D58"/>
    <text x="50" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial">МИР</text>
  </svg>
);

// VISA - синий
export const VisaIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="90" height="30" rx="4" fill="#1A1F71"/>
    <text x="50" y="27" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="Arial" fontStyle="italic">VISA</text>
  </svg>
);

// MasterCard - красный и оранжевый круги
export const MasterCardIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="38" cy="20" r="14" fill="#EB001B"/>
    <circle cx="62" cy="20" r="14" fill="#F79E1B"/>
    <path d="M50 9.5C53.5 12 56 15.7 56 20C56 24.3 53.5 28 50 30.5C46.5 28 44 24.3 44 20C44 15.7 46.5 12 50 9.5Z" fill="#FF5F00"/>
  </svg>
);

// Наличные - иконка рубля
export const CashIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="5" width="80" height="30" rx="3" fill="#4CAF50"/>
    <rect x="13" y="8" width="74" height="24" rx="2" fill="#66BB6A"/>
    <circle cx="50" cy="20" r="10" fill="#4CAF50"/>
    <text x="50" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial">₽</text>
    <circle cx="20" cy="20" r="3" fill="#4CAF50"/>
    <circle cx="80" cy="20" r="3" fill="#4CAF50"/>
  </svg>
);

interface PaymentMethodProps {
  icon: React.ReactNode;
  label: string;
}

const PaymentMethod = ({ icon, label }: PaymentMethodProps) => (
  <div className="flex flex-col items-center gap-3 p-4 bg-card rounded-xl shadow-soft hover:shadow-card transition-shadow">
    <div className="w-20 h-10">
      {icon}
    </div>
    <span className="text-sm font-medium text-foreground text-center">{label}</span>
  </div>
);

export const PaymentMethods = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
    <PaymentMethod icon={<SBPIcon className="w-full h-full" />} label="СБП" />
    <PaymentMethod icon={<MirIcon className="w-full h-full" />} label="МИР" />
    <PaymentMethod icon={<VisaIcon className="w-full h-full" />} label="VISA" />
    <PaymentMethod icon={<MasterCardIcon className="w-full h-full" />} label="MasterCard" />
    <PaymentMethod icon={<CashIcon className="w-full h-full" />} label="Наличные" />
  </div>
);
