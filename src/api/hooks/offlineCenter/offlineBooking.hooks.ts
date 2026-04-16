import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import type { ApiResponse } from "../../../types/api.types";
import type { OfflineBooking, CreateOfflineBookingInput } from "../../../types/offlineCenter/offlineBooking.types";

export const useCreateOfflineBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateOfflineBookingInput) => {
      const { data } = await api.post<ApiResponse<{ booking: OfflineBooking }>>(
        "/offline-bookings",
        input
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["offline-bookings"] });
      queryClient.invalidateQueries({ queryKey: ["offline-batches"] });
    },
  });
};

export const useOfflineBookings = () => {
  return useQuery({
    queryKey: ["offline-bookings"],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<{ bookings: OfflineBooking[] }>>(
        "/offline-bookings"
      );
      return data.data;
    },
  });
};
