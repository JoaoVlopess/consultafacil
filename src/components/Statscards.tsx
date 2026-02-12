
import React from 'react';

export interface StatCardConfig {
  label: string;           
  value: number;          
  icon: React.ReactNode;  
  color: 'red' | 'orange' | 'blue' | 'green' | 'gray' | 'purple'; 
}

interface StatsCardsProps {
  cards: StatCardConfig[];
  columns?: 2 | 3 | 4;    
}

const colorClasses = {
  red: {
    text: 'text-red-600',
    bg: 'bg-red-50',
    iconBg: 'bg-red-100',
  },
  orange: {
    text: 'text-orange-600',
    bg: 'bg-orange-50',
    iconBg: 'bg-orange-100',
  },
  blue: {
    text: 'text-blue-600',
    bg: 'bg-blue-50',
    iconBg: 'bg-blue-100',
  },
  green: {
    text: 'text-green-600',
    bg: 'bg-green-50',
    iconBg: 'bg-green-100',
  },
  gray: {
    text: 'text-gray-600',
    bg: 'bg-gray-50',
    iconBg: 'bg-gray-100',
  },
  purple: {
    text: 'text-purple-600',
    bg: 'bg-purple-50',
    iconBg: 'bg-purple-100',
  },
};


const gridColsClasses = {
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
};

export function StatsCards({ cards, columns = 4 }: StatsCardsProps) {
  return (
    <div className={`grid ${gridColsClasses[columns]} gap-6 mb-6`}>
      {cards.map((card, index) => {
        const colors = colorClasses[card.color];

        return (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {card.label}
                </p>
                <p className={`text-2xl font-bold ${colors.text} mt-1`}>
                  {card.value}
                </p>
              </div>
              <div
                className={`w-10 h-10 ${colors.iconBg} rounded-lg flex items-center justify-center`}
              >
                {typeof card.icon === 'string' ? (
                  <i className={`${card.icon} ${colors.text}`}></i>
                ) : (
                  <div className={colors.text}>{card.icon}</div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}