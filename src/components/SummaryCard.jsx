import { memo } from "react";

const SummaryCard = memo(({ title, value, icon, trend, color = "from-indigo-500 to-purple-500", isLarge = false }) => {
  const isTrendUp = trend >= 0;
  
  return (
    <div
      className={`
        bg-gradient-to-br ${color}
        text-white p-4 sm:p-5 md:p-6 rounded-2xl shadow-md
        border border-white/20
        backdrop-blur-sm
        ${isLarge ? 'col-span-2' : ''}
        hover:shadow-lg transition-shadow duration-150
      `}
    >
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-semibold opacity-90 mb-2 sm:mb-3 line-clamp-1">{title}</p>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold truncate">₹{(value/1000).toFixed(0)}k</p>
          
          {trend !== undefined && (
            <div className={`flex items-center gap-1 mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm font-medium ${isTrendUp ? 'text-green-200' : 'text-red-200'} line-clamp-1`}>
              <span className="text-sm md:text-lg flex-shrink-0">{isTrendUp ? '↑' : '↓'}</span>
              <span>{Math.abs(trend)}% from last month</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className="text-3xl sm:text-4xl md:text-5xl opacity-30 flex-shrink-0">{icon}</div>
        )}
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.value === nextProps.value &&
    prevProps.title === nextProps.title &&
    prevProps.trend === nextProps.trend &&
    prevProps.color === nextProps.color &&
    prevProps.icon === nextProps.icon
  );
});

SummaryCard.displayName = 'SummaryCard';

export default SummaryCard;