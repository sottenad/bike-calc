import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <section className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 ${className}`}>
      {children}
    </section>
  );
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <h2 className={`text-lg font-semibold text-gray-900 mb-4 ${className}`}>
      {children}
    </h2>
  );
}
