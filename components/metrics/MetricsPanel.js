"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Activity, Box, Users, Fuel } from "lucide-react";

const formatSupply = (supply) => {
  if (!supply) return "0";
  const num = Number(supply);
  if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
  return num.toLocaleString();
};

export default function MetricsPanel({ darkMode }) {
  const { data: head } = useQuery(["head"], api.getHead);
  const { data: networkStats } = useQuery(
    ["networkStats"],
    api.getNetworkStats
  );
  const { data: gasEstimates } = useQuery(
    ["gasEstimates"],
    api.getGasEstimates
  );

  const metrics = [
    {
      title: "Total Blocks",
      value: networkStats?.blockCount || "0",
      icon: Box,
    },
    {
      title: "Active Addresses",
      value: networkStats?.addressCount || "0",
      icon: Users,
    },
    {
      title: "Gas Price",
      value: `${Number(networkStats?.gasPrice?.median || 0).toFixed(4)} TIA`,
      icon: Fuel,
    },
    {
      title: "Total Supply",
      value: `${formatSupply(head?.total_supply)} TIA`,
      icon: Activity,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric, i) => (
        <div
          key={i}
          className={`p-4 rounded-xl shadow-lg ${
            darkMode ? "bg-gray-700" : "bg-white"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">{metric.title}</h3>
            <metric.icon className="w-4 h-4 opacity-70" />
          </div>
          <p className="text-2xl font-bold">{metric.value}</p>
        </div>
      ))}
    </div>
  );
}
