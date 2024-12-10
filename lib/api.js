import { ENDPOINTS } from "../lib/utils/endpoints";

export const api = {
  getHead: async () => {
    const res = await fetch(ENDPOINTS.HEAD);
    const data = await res.json();
    // console.log("Head data:", data);
    return data;
  },

  // Network Info
  getNetworkStats: async () => {
    const [blockCount, addressCount, gasPrice] = await Promise.all([
      fetch(ENDPOINTS.BLOCK_COUNT).then((res) => res.json()),
      fetch(ENDPOINTS.ADDRESS_COUNT).then((res) => res.json()),
      fetch(ENDPOINTS.GAS_PRICE).then((res) => res.json()),
    ]);
    return { blockCount, addressCount, gasPrice };
  },

  getConstants: async () => {
    const res = await fetch(ENDPOINTS.CONSTANTS);
    const data = await res.json();
    // console.log("Constants data:", data);
    return data;
  },

  // Namespace Data
  getNamespaces: async () => {
    const query = "?limit=10&offset=0&sort=desc&sort_by=size";
    const res = await fetch(`${ENDPOINTS.NAMESPACES}${query}`);
    const data = await res.json();
    // console.log("Namespaces data:", data);
    return data;
  },

  getActiveNamespaces: async () => {
    const query = "?sort=size";
    const res = await fetch(`${ENDPOINTS.ACTIVE_NAMESPACES}${query}`);
    const data = await res.json();
    // console.log("Active namespaces:", data);
    return data;
  },

  getNamespaceRollups: async (id, version) => {
    const res = await fetch(
      `${ENDPOINTS.NAMESPACES}/${id}/${version}/rollups?limit=10&offset=0`
    );
    const data = await res.json();
    // console.log("Namespace rollups:", data);
    return data;
  },

  // Gas Estimates
  getGasEstimates: async () => {
    const sizes = "?sizes=12,123";
    const [blobGas, gasPrice] = await Promise.all([
      fetch(`${ENDPOINTS.GAS_ESTIMATE}${sizes}`).then((res) => res.json()),
      fetch(ENDPOINTS.GAS_PRICE).then((res) => res.json()),
    ]);
    return { blobGas, gasPrice };
  },

  search: async (query) => {
    const res = await fetch(`${ENDPOINTS.SEARCH}?query=${query}`);
    const data = await res.json();
    // console.log("Search data:", data);
    return data;
  },
};
