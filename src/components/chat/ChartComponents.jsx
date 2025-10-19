import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  AreaChart, Area, BarChart, Bar, ResponsiveContainer, PieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";

const tooltipStyle = {
  backgroundColor: '#1e293b',
  border: '1px solid #10b981',
  borderRadius: '8px',
  color: '#fff'
};

export const SpendingChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={280}>
    <AreaChart data={data}>
      <defs>
        <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#10b981" stopOpacity={0.45} />
          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
      <XAxis dataKey="week" stroke="#9ca3af" style={{ fontSize: '12px' }} />
      <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
      <Tooltip contentStyle={tooltipStyle} />
      <Area type="monotone" dataKey="amount" stroke="#10b981" fill="url(#spendGrad)" strokeWidth={2} />
      <Line type="monotone" dataKey="budget" stroke="#94a3b8" strokeDasharray="5 4" strokeWidth={2} />
      <Line type="monotone" dataKey="lastMonth" stroke="#475569" strokeDasharray="3 3" strokeWidth={1.5} />
    </AreaChart>
  </ResponsiveContainer>
);

export const SavingsChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={260}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
      <XAxis dataKey="name" stroke="#9ca3af" style={{ fontSize: '12px' }} />
      <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
      <Tooltip contentStyle={tooltipStyle} />
      <Bar dataKey="saved" fill="#22c55e" radius={[6, 6, 0, 0]} />
      <Bar dataKey="potential" fill="#059669" radius={[6, 6, 0, 0]} opacity={0.4} />
    </BarChart>
  </ResponsiveContainer>
);

export const PortfolioCharts = ({ roiData, pieData }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={roiData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis dataKey="name" stroke="#9ca3af" style={{ fontSize: '11px' }} />
        <YAxis stroke="#9ca3af" style={{ fontSize: '11px' }} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="roi" fill="#10b981" radius={[6, 6, 0, 0]} />
        <Bar dataKey="target" fill="#34d399" radius={[6, 6, 0, 0]} opacity={0.3} />
      </BarChart>
    </ResponsiveContainer>

    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie 
          data={pieData} 
          innerRadius={60} 
          outerRadius={90} 
          dataKey="value" 
          paddingAngle={3}
          label={({ name, value }) => `${name} ${value}%`}
          labelStyle={{ fontSize: '11px', fill: '#e5e7eb' }}
        >
          {pieData.map((s, i) => <Cell key={i} fill={s.color} />)}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export const HealthChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={280}>
    <RadarChart data={data}>
      <PolarGrid stroke="#334155" />
      <PolarAngleAxis dataKey="metric" stroke="#9ca3af" style={{ fontSize: '11px' }} />
      <PolarRadiusAxis stroke="#64748b" style={{ fontSize: '10px' }} />
      <Radar name="Current" dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.5} />
      <Radar name="Target" dataKey="target" stroke="#34d399" fill="#34d399" fillOpacity={0.2} />
      <Tooltip contentStyle={tooltipStyle} />
    </RadarChart>
  </ResponsiveContainer>
);

export const BudgetChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={260}>
    <BarChart data={data} layout="vertical">
      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
      <XAxis type="number" stroke="#9ca3af" style={{ fontSize: '12px' }} />
      <YAxis type="category" dataKey="cat" stroke="#9ca3af" width={100} style={{ fontSize: '12px' }} />
      <Tooltip contentStyle={tooltipStyle} />
      <Bar dataKey="used" fill="#059669" radius={[0, 6, 6, 0]} />
      <Bar dataKey="budget" fill="#1e293b" radius={[0, 6, 6, 0]} opacity={0.3} />
    </BarChart>
  </ResponsiveContainer>
);

export const GoalsChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={260}>
    <BarChart data={data} layout="vertical">
      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
      <XAxis type="number" stroke="#9ca3af" style={{ fontSize: '12px' }} domain={[0, 100]} />
      <YAxis type="category" dataKey="goal" stroke="#9ca3af" width={140} style={{ fontSize: '12px' }} />
      <Tooltip contentStyle={tooltipStyle} />
      <Bar dataKey="progress" fill="#10b981" radius={[0, 6, 6, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

export const AlertsChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={240}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
      <XAxis dataKey="day" stroke="#9ca3af" style={{ fontSize: '12px' }} />
      <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
      <Tooltip contentStyle={tooltipStyle} />
      <Line type="monotone" dataKey="alerts" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 5 }} />
    </LineChart>
  </ResponsiveContainer>
);