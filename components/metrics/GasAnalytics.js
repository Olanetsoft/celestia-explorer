import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Fuel, Gauge, TrendingUp } from "lucide-react";
import Card from "../ui/Card";

function formatGasPrice(price) {
  if (!price || typeof price !== "string") return "0.0000";
  return Number(price).toFixed(4);
}

export default function GasAnalytics({ darkMode }) {
  const { data: gasEstimates } = useQuery(
    ["gasEstimates"],
    api.getGasEstimates
  );
  const { data: constants } = useQuery(["constants"], api.getConstants);

  const metadata = constants?.denom_metadata?.[0];

  const GasCard = ({ title, value, icon: Icon, color }) => (
    <div
      className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-4 h-4 ${color}`} />
        <span className="text-sm opacity-70">{title}</span>
      </div>
      <p className="text-lg font-bold">{formatGasPrice(value)}</p>
      <p className="text-xs opacity-50">TIA</p>
    </div>
  );

  return (
    <Card darkMode={darkMode}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Gas Analytics</h2>
        <Fuel className="w-5 h-5 opacity-70" />
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {gasEstimates?.gasPrice && (
            <>
              <GasCard
                title="Slow"
                value={gasEstimates.gasPrice.slow}
                icon={Gauge}
                color="text-green-500"
              />
              <GasCard
                title="Medium"
                value={gasEstimates.gasPrice.median}
                icon={Gauge}
                color="text-yellow-500"
              />
              <GasCard
                title="Fast"
                value={gasEstimates.gasPrice.fast}
                icon={Gauge}
                color="text-red-500"
              />
            </>
          )}
        </div>

        <div
          className={`p-4 rounded-lg ${
            darkMode ? "bg-gray-700" : "bg-gray-50"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Network Token</h3>
            <TrendingUp className="w-4 h-4 opacity-70" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm opacity-70">Symbol</span>
              <span className="font-mono">{metadata?.symbol || "TIA"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm opacity-70">Base Unit</span>
              <span className="font-mono">{metadata?.base || "utia"}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
