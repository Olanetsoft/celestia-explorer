import { useState } from "react";
import { Search, ArrowRight, X } from "lucide-react";
import { api } from "@/lib/api";
import TransactionDetails from "./TransactionDetails";

export default function SearchBar({ darkMode }) {
  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchValue.trim()) return;

    try {
      setIsLoading(true);
      const data = await api.search(searchValue);
      const result = data?.[0]?.result;

      if (result && result.hash && result.status) {
        // Looks like a valid transaction
        setSearchHistory((prev) => [result, ...prev]);
        setShowModal(true);
      } else {
        console.error("Invalid search result data:", result);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className={`mb-8 ${
          darkMode ? "bg-gray-800" : "bg-white"
        } rounded-2xl p-1 shadow-lg max-w-2xl mx-auto`}
      >
        <div className="relative flex items-center">
          <Search
            className={`w-5 h-5 absolute left-4 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          />
          <input
            type="text"
            placeholder="Search by hash, address, or namespace..."
            className={`w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none ${
              darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
            }`}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className={`absolute right-2 p-2 rounded-lg ${
              darkMode
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white transition-colors duration-200`}
          >
            {isLoading ? "..." : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div
            className={`max-w-2xl w-full ${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-2xl shadow-xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Transaction Details</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 max-h-[70vh] overflow-auto space-y-6">
              {searchHistory.map((tx, index) => (
                <TransactionDetails key={index} tx={tx} darkMode={darkMode} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
