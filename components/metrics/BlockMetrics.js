import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Blocks, ArrowUp, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import Card from "../ui/Card";

export default function BlockMetrics({ darkMode }) {
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const {
    data: networkStats,
    error: networkError,
    isError: networkIsError,
    isLoading: networkIsLoading,
  } = useQuery(["networkStats"], api.getNetworkStats, {
    // Optionally, don't retry on 429 errors
    retry: (failureCount, error) => {
      if (error?.status === 429) return false;
      return failureCount < 3;
    },
  });

  const {
    data: head,
    error: headError,
    isError: headIsError,
    isLoading: headIsLoading,
  } = useQuery(["head"], api.getHead, {
    retry: (failureCount, error) => {
      if (error?.status === 429) return false;
      return failureCount < 3;
    },
  });

  useEffect(() => {
    if (networkStats) {
      setLastUpdate(new Date());
    }
  }, [networkStats]);

  const StatCard = ({ title, value, className = "" }) => (
    <div
      className={`p-4 rounded-lg ${
        darkMode ? "bg-gray-700" : "bg-gray-50"
      } ${className}`}
    >
      <span className="text-sm opacity-70">{title}</span>
      <p className="font-mono mt-1">{value}</p>
    </div>
  );

  // Handle loading states
  if (networkIsLoading || headIsLoading) {
    return (
      <Card darkMode={darkMode}>
        <p>Loading...</p>
      </Card>
    );
  }

  // Handle errors for networkStats
  if (networkIsError) {
    const isRateLimited = networkError?.status === 429;
    return (
      <Card darkMode={darkMode}>
        <p className="text-red-500">
          {isRateLimited
            ? "You've hit the rate limit. Please try again later."
            : "Failed to load network stats."}
        </p>
      </Card>
    );
  }

  // Handle errors for head
  if (headIsError) {
    const isRateLimited = headError?.status === 429;
    return (
      <Card darkMode={darkMode}>
        <p className="text-red-500">
          {isRateLimited
            ? "You've hit the rate limit. Please try again later."
            : "Failed to load block head data."}
        </p>
      </Card>
    );
  }

  // If we got here, we have successful data
  return (
    <Card darkMode={darkMode}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Block Metrics</h2>
        <Blocks className="w-5 h-5 opacity-70" />
      </div>

      <div className="space-y-6">
        <div
          className={`p-6 rounded-lg ${
            darkMode ? "bg-gray-700" : "bg-gray-50"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Latest Block</h3>
            <ArrowUp className="w-4 h-4 opacity-70" />
          </div>
          <div className="text-3xl font-bold mb-2">
            {networkStats?.blockCount?.toLocaleString() || "0"}
          </div>
          <div className="flex items-center text-sm opacity-70">
            <Clock className="w-4 h-4 mr-1" />
            Updated {lastUpdate.toLocaleTimeString()}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <StatCard title="Chain ID" value={head?.chain_id || "N/A"} />
          <StatCard
            title="Total Validators"
            value={head?.total_validators?.toLocaleString() || "0"}
          />
        </div>
      </div>
    </Card>
  );
}
