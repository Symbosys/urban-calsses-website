import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import type { ApiResponse } from "../../../types/api.types";
import type {
  OfflineCenter,
  OfflineCenterFilters
} from "../../../types/offlineCenter/offlineCenter.types";

export const useOfflineCenters = (params: OfflineCenterFilters = {}) => {
  return useQuery({
    queryKey: ["offline-centers", params],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<{ centers: OfflineCenter[] }>>(
        "/offline-centers",
        { params }
      );
      return data.data;
    },
  });
};

export const useOfflineCenter = (id: string) => {
  return useQuery({
    queryKey: ["offline-centers", id],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<{ center: OfflineCenter }>>(`/offline-centers/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
};
