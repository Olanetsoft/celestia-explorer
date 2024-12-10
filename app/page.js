"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import MetricsPanel from "@/components/metrics/MetricsPanel";
import SearchBar from "@/components/search/SearchBar";
import Charts from "@/components/namespaces/Charts";
import GasAnalytics from "@/components/metrics/GasAnalytics";
import BlockMetrics from "@/components/metrics/BlockMetrics";
import { api } from "@/lib/api";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const { refetch: refreshData } = useQuery(["head"], api.getHead);

  return (
    <main
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto p-6">
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onRefresh={refreshData}
        />
        <SearchBar darkMode={darkMode} />
        <MetricsPanel darkMode={darkMode} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <GasAnalytics darkMode={darkMode} />
          <BlockMetrics darkMode={darkMode} />
          <div className="lg:col-span-2">
            <Charts darkMode={darkMode} />
          </div>
        </div>
      </div>
    </main>
  );
}
