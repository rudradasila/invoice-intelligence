import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white border border-[#E5E3DB] p-2.5 rounded-md shadow-soft-md font-mono text-xs">
        <div className="text-[#1F2522] font-semibold">{data.name}</div>
        <div className="text-[#006B4F] mt-1 font-medium">
          {data.value} documents ({data.percentage})
        </div>
      </div>
    );
  }
  return null;
};

export const DocumentTypeChart = ({ data, height = 260 }) => {
  // Forest green harmonious palette
  const colors = ['#006B4F', '#004F3B', '#2A876B', '#58A88E'];

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
        >
          <XAxis
            type="number"
            stroke="#68716C"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: '#E5E3DB' }}
            fontFamily="JetBrains Mono, monospace"
          />
          <YAxis
            type="category"
            dataKey="name"
            stroke="#1F2522"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            width={110}
            fontFamily="Inter, sans-serif"
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={16}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
