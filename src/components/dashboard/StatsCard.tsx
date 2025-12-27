//Exibir um card de estatística recebe as props

// src/components/dashboard/StatsCard.tsx

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: string;
  iconBgColor: string;
  iconColor: string;
  trendIcon?: string;
  trendColor?: string;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon,
  iconBgColor,
  iconColor,
  trendIcon,
  trendColor,
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          <p className={`text-xs mt-2 ${trendColor || 'text-gray-500'}`}>
            {trendIcon && <i className={`fas ${trendIcon} mr-1`}></i>}
            {subtitle}
          </p>
        </div>
        <div className={`w-12 h-12 ${iconBgColor} rounded-full flex items-center justify-center`}>
          <i className={`fas ${icon} ${iconColor} text-xl`}></i>
        </div>
      </div>
    </div>
  );
}