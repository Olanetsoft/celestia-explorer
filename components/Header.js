"use client";

import { Database, Moon, Sun, RefreshCw } from "lucide-react";
import IconButton from "./ui/IconButton";

export default function Header({ darkMode, setDarkMode, onRefresh }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center space-x-4">
        <Database
          className={`w-8 h-8 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
        />
        <h1 className="text-4xl font-bold tracking-tight">
          Celestia Namespace Analytics
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <IconButton
          icon={darkMode ? Sun : Moon}
          onClick={() => setDarkMode(!darkMode)}
          darkMode={darkMode}
        />
        <IconButton icon={RefreshCw} onClick={onRefresh} darkMode={darkMode} />
      </div>
    </div>
  );
}
