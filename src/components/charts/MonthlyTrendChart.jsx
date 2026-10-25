import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-[#E5E3DB] p-3 rounded-md shadow-soft-md font-mono text-xs">
        <div className="text-[#1F2522] font-semibold mb-1">{label} 2026</div>
        <div className="text-[#006B4F] flex items-center gap-1.5 font-medium">
          <span className="w-2 h-2 rounded-full bg-[#006B4F]" />
          Processed Value: <span className="font-bold">₹{payload[0].value}L</span>
        </div>
        {payload[1] && (
          <div className="text-[#68716C] flex items-center gap-1.5 mt-1">
            <span className="w-2 h-2 rounded-full bg-[#68716C]" />
            Volume: <span className="font-bold">{payload[1].value} docs</span>
          </div>
        )}
      </div>
    );
  }
  return null;
};

export const MonthlyTrendChart = ({ data, height = 260 }) => {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="forestGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#006B4F" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#006B4F" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#E5E3DB"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            stroke="#68716C"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: '#E5E3DB' }}
            fontFamily="Inter, sans-serif"
          />
          <YAxis
            stroke="#68716C"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `₹${v}L`}
            fontFamily="JetBrains Mono, monospace"
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#006B4F"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#forestGradient)"
            dot={{ r: 3, fill: '#006B4F', stroke: '#FFFFFF', strokeWidth: 1.5 }}
            activeDot={{ r: 5, fill: '#004F3B', stroke: '#FFFFFF', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
