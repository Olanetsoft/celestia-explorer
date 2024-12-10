"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import Card from "@/components/ui/Card";
import NamespaceChart from "./NamespaceChart";
import NamespaceTable from "./NamespaceTable";

export default function Charts({ darkMode }) {
  const { data: namespaces = [], error: namespacesError } = useQuery(
    ["namespaces"],
    api.getNamespaces
  );
  const { data: activeNamespaces = [], error: activeError } = useQuery(
    ["activeNamespaces"],
    api.getActiveNamespaces
  );

  const sortedActiveNamespaces = React.useMemo(() => {
    if (!Array.isArray(activeNamespaces)) return [];
    return [...activeNamespaces].sort((a, b) => b.blobs_count - a.blobs_count);
  }, [activeNamespaces]);

  if (namespacesError || activeError) {
    return (
      <div className="text-red-500 p-4">
        Failed to load data. Please try again.
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <Card darkMode={darkMode}>
        <h2 className="text-xl font-semibold mb-6">Namespace Usage</h2>
        <NamespaceChart data={namespaces} darkMode={darkMode} />
      </Card>

      <Card darkMode={darkMode}>
        <h2 className="text-xl font-semibold mb-6">Active Namespaces</h2>
        <NamespaceTable
          namespaces={sortedActiveNamespaces}
          darkMode={darkMode}
        />
      </Card>
    </div>
  );
}
