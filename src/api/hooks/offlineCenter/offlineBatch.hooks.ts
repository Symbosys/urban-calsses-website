import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import type { ApiResponse } from "../../../types/api.types";
import type { OfflineBatch, OfflineBatchFilters } from "../../../types/offlineCenter/offlineBatch.types";

export const useOfflineBatches = (params: OfflineBatchFilters = {}) => {
  return useQuery({
    queryKey: ["offline-batches", params],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<{ batches: OfflineBatch[] }>>(
        "/offline-batches",
        { params }
      );
      return data.data;
    },
  });
};

export const useOfflineBatch = (id: string) => {
  return useQuery({
    queryKey: ["offline-batches", id],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<{ batch: OfflineBatch }>>(
        `/offline-batches/${id}`
      );
      return data.data;
    },
    enabled: !!id,
  });
};
