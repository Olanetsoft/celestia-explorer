"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const formatNamespaceData = (data) => {
  if (!data || !Array.isArray(data)) return [];
  return data
    .map((ns) => ({
      name: (ns.name || ns.namespace_id || "Unknown").substring(0, 12) + "...",
      size: ns.size ? (ns.size / 1024).toFixed(2) : "0",
      blobs: ns.blobs_count || 0,
    }))
    .filter(Boolean);
};

export default function NamespaceChart({ data, darkMode }) {
  return (
    <div className="h-96">
      <ResponsiveContainer>
        <BarChart data={formatNamespaceData(data)} layout="vertical">
          <XAxis type="number" stroke={darkMode ? "#9CA3AF" : "#4B5563"} />
          <YAxis
            dataKey="name"
            type="category"
            width={100}
            tick={(props) => (
              <text
                x={props.x}
                y={props.y}
                dy={3}
                textAnchor="end"
                fontSize={12}
              >
                {props.payload.value.length > 10
                  ? props.payload.value.substring(0, 10) + "..."
                  : props.payload.value}
              </text>
            )}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? "#1F2937" : "white",
              border: "none",
              borderRadius: "0.5rem",
            }}
            formatter={(value, name) => [`${value} KB`, "Size"]}
          />
          <Bar
            dataKey="size"
            fill={darkMode ? "#60A5FA" : "#2563EB"}
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
