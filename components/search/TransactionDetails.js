"use client";

import {
  CheckCircle2,
  AlertCircle,
  Blocks,
  CircleDollarSign,
  Fuel,
} from "lucide-react";
import { formatDate } from "@/lib/utils/formatters";

function StatCard({ icon: Icon, title, value, darkMode }) {
  return (
    <div
      className={`p-4 rounded-lg ${darkMode ? "bg-gray-900/50" : "bg-gray-50"}`}
    >
      <div className="flex items-center space-x-2 mb-2">
        <Icon className="w-4 h-4 opacity-70" />
        <p className="text-sm opacity-70">{title}</p>
      </div>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}

export default function TransactionDetails({ tx, darkMode }) {
  if (!tx || typeof tx !== "object") {
    // If tx is not present or not an object, show a fallback
    return (
      <div
        className={
          darkMode
            ? "bg-gray-800 text-gray-100 p-4"
            : "bg-white text-gray-900 p-4"
        }
      >
        <p>Invalid transaction data.</p>
      </div>
    );
  }

  // Check if tx looks like a valid transaction
  // A valid tx likely has 'status' and 'hash'
  const isValidTx =
    typeof tx.status === "string" && typeof tx.hash === "string";

  if (!isValidTx) {
    // If it's not a valid transaction object, display a fallback or log the full object
    return (
      <div
        className={
          darkMode
            ? "bg-gray-800 text-gray-100 p-4"
            : "bg-white text-gray-900 p-4"
        }
      >
        <p>Received unexpected data:</p>
        <pre className="text-sm">{JSON.stringify(tx, null, 2)}</pre>
      </div>
    );
  }

  // Safely handle fee
  let feeDisplay = "0 TIA";
  if (typeof tx.fee === "string") {
    feeDisplay = `${tx.fee} TIA`;
  } else if (tx.fee && typeof tx.fee === "object") {
    // If fee is an object, convert it safely
    feeDisplay = JSON.stringify(tx.fee);
  }

  // Safely handle message_types
  let messageTypes = [];
  if (Array.isArray(tx.message_types)) {
    messageTypes = tx.message_types.map((type) => {
      return typeof type === "string" ? type : JSON.stringify(type);
    });
  }

  return (
    <div
      className={`${
        darkMode ? "bg-gray-800" : "bg-white"
      } rounded-xl shadow-lg overflow-hidden`}
    >
      <div
        className={`w-full p-4 ${
          tx.status === "success" ? "bg-green-500/10" : "bg-red-500/10"
        } border-b border-gray-200/10`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {tx.status === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500" />
            )}
            <span className="font-medium">
              {tx.status === "success"
                ? "Transaction Successful"
                : "Transaction Failed"}
            </span>
          </div>
          <span className="text-sm opacity-70">{formatDate(tx.time)}</span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Blocks className="w-4 h-4 opacity-70" />
            <h3 className="text-sm font-medium opacity-70">Transaction Hash</h3>
          </div>
          <div
            className={`p-3 rounded-lg ${
              darkMode ? "bg-gray-900" : "bg-gray-50"
            } font-mono text-sm break-all`}
          >
            {tx.hash}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <StatCard
            icon={CircleDollarSign}
            title="Fee"
            value={feeDisplay}
            darkMode={darkMode}
          />
          <StatCard
            icon={Blocks}
            title="Block Height"
            value={tx.height}
            darkMode={darkMode}
          />
          <StatCard
            icon={Fuel}
            title="Gas Used"
            value={tx.gas_used}
            darkMode={darkMode}
          />
          <StatCard
            icon={Fuel}
            title="Gas Wanted"
            value={tx.gas_wanted}
            darkMode={darkMode}
          />
        </div>

        {messageTypes.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium opacity-70">Message Types</h3>
            <div className="flex flex-wrap gap-2">
              {messageTypes.map((type, i) => (
                <span
                  key={i}
                  className={`px-3 py-1.5 rounded-full text-sm ${
                    darkMode
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-blue-50 text-blue-600"
                  }`}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
