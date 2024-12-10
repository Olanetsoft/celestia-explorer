"use client";

import { formatNamespaceId, formatTimeAgo } from "@/lib/utils/formatters";

export default function NamespaceTable({ namespaces = [], darkMode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr
            className={`text-left ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <th className="pb-4">Namespace</th>
            <th className="pb-4">Blobs</th>
            <th className="pb-4">Size</th>
            <th className="pb-4">Last Active</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {namespaces.map((ns, i) => (
            <tr
              key={i}
              className={`${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
              }`}
            >
              <td className="py-3">
                <span className="font-mono bg-blue-500/10 text-blue-500 px-2 py-1 rounded">
                  {formatNamespaceId(ns.namespace_id)}
                </span>
              </td>
              <td className="py-3">
                <span className="font-semibold">
                  {ns.blobs_count.toLocaleString()}
                </span>
              </td>
              <td className="py-3">{(ns.size / 1024).toFixed(2)} KB</td>
              <td className="py-3 text-sm">
                {formatTimeAgo(ns.last_message_time)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
