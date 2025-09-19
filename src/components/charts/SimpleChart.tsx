import React from 'react';
import { motion } from 'framer-motion';

interface ChartData {
  label: string;
  value: number;
  color?: string;
}

interface SimpleChartProps {
  data: ChartData[];
  type: 'bar' | 'line' | 'pie';
  height?: number;
  className?: string;
}

export const SimpleChart: React.FC<SimpleChartProps> = ({
  data,
  type,
  height = 200,
  className = ""
}) => {
  const maxValue = Math.max(...data.map(d => d.value));

  if (type === 'bar') {
    return (
      <div className={`w-full ${className}`} style={{ height }}>
        <div className="flex items-end justify-between h-full gap-2">
          {data.map((item, index) => (
            <motion.div
              key={item.label}
              className="flex-1 flex flex-col items-center gap-2"
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className="w-full bg-gradient-gold rounded-t-lg relative overflow-hidden"
                style={{ 
                  height: `${(item.value / maxValue) * 80}%`,
                  backgroundColor: item.color || 'hsl(var(--accent))'
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>
              <div className="text-xs text-center text-muted-foreground font-medium">
                {item.label}
              </div>
              <div className="text-sm font-bold text-accent">
                {item.value}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'pie') {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercentage = 0;

    return (
      <div className={`flex items-center gap-8 ${className}`}>
        <div className="relative" style={{ width: height, height }}>
          <svg width={height} height={height} className="transform -rotate-90">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const strokeDasharray = `${percentage * 2.83} 283`;
              const strokeDashoffset = -cumulativePercentage * 2.83;
              cumulativePercentage += percentage;

              return (
                <motion.circle
                  key={item.label}
                  cx={height / 2}
                  cy={height / 2}
                  r="45"
                  fill="transparent"
                  stroke={item.color || `hsl(${index * 60}, 70%, 60%)`}
                  strokeWidth="8"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  initial={{ strokeDasharray: "0 283" }}
                  animate={{ strokeDasharray }}
                  transition={{ delay: index * 0.2, duration: 1 }}
                />
              );
            })}
          </svg>
        </div>
        
        <div className="space-y-2">
          {data.map((item, index) => (
            <motion.div
              key={item.label}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.color || `hsl(${index * 60}, 70%, 60%)` }}
              />
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <span className="text-sm font-semibold ml-auto">{item.value}</span>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};