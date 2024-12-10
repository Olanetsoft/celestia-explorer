import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useNetworkStats() {
  const { data: head } = useQuery(["head"], api.getHead);
  const { data: networkStats } = useQuery(
    ["networkStats"],
    api.getNetworkStats
  );
  const { data: gasEstimates } = useQuery(
    ["gasEstimates"],
    api.getGasEstimates
  );

  return {
    head,
    networkStats,
    gasEstimates,
    isLoading: !head || !networkStats || !gasEstimates,
  };
}
