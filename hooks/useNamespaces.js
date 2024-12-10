import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useMemo } from "react";

export function useNamespaces() {
  const { data: namespaces = [], error: namespacesError } = useQuery(
    ["namespaces"],
    api.getNamespaces
  );
  const { data: activeNamespaces = [], error: activeError } = useQuery(
    ["activeNamespaces"],
    api.getActiveNamespaces
  );

  const sortedActiveNamespaces = useMemo(() => {
    if (!Array.isArray(activeNamespaces)) return [];
    return [...activeNamespaces].sort((a, b) => b.blobs_count - a.blobs_count);
  }, [activeNamespaces]);

  return {
    namespaces,
    sortedActiveNamespaces,
    isError: namespacesError || activeError,
    isLoading: !namespaces || !activeNamespaces,
  };
}
