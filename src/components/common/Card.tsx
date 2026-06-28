import React, { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  icon?: ReactNode;
  variant?: 'default' | 'bordered' | 'elevated';
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  title, 
  icon,
  variant = 'default',
  onClick 
}) => {
  const variants = {
    default: 'bg-white shadow-sm border border-gray-200',
    bordered: 'bg-white border-2 border-gray-300',
    elevated: 'bg-white shadow-lg hover:shadow-xl transition-shadow'
  };

  return (
    <div 
      className={`rounded-xl overflow-hidden ${variants[variant]} ${onClick ? 'cursor-pointer hover:border-gray-400 transition-all' : ''} ${className}`}
      onClick={onClick}
    >
      {(title || icon) && (
        <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-3 bg-gray-50/50">
          {icon && <span className="text-gray-700">{icon}</span>}
          {title && <h3 className="font-semibold text-gray-900">{title}</h3>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};

export default Card;