import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../api";
import type { ApiResponse } from "../../../types/api.types";
import { showErrorMessage, showSuccessMessage } from "../../../utils/message";

export interface CheckoutResponse {
  order_id: string;
  amount: number;
  currency: string;
  course_title: string;
  key_id: string;
}

export interface VerifyPaymentPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export const useCheckout = () => {
  return useMutation({
    mutationFn: async (courseId: string) => {
      const { data } = await api.post<ApiResponse<CheckoutResponse>>("/purchase/checkout", { courseId });
      return data.data;
    },
    onError: (error: any) => {
      showErrorMessage(error);
    },
  });
};

export const useVerifyPayment = () => {
  return useMutation({
    mutationFn: async (payload: VerifyPaymentPayload) => {
      const { data } = await api.post<ApiResponse<{ courseId: string }>>("/purchase/verify", payload);
      return data.data;
    },
    onSuccess: () => {
      showSuccessMessage("Course purchased successfully!");
    },
    onError: (error: any) => {
      showErrorMessage(error);
    },
  });
};

export const useCheckEnrollment = (courseId: string, userId: string) => {
  return useQuery({
    queryKey: ["purchase", "check", courseId, userId],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<{ isEnrolled: boolean }>>(`/purchase/check/${courseId}`);
      return data.data;
    },
    enabled: !!courseId && !!userId,
  });
};
