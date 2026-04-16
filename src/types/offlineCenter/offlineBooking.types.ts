import type { OfflineBatch } from "./offlineBatch.types";

export interface OfflineBooking {
  id: string;
  name: string;
  email: string;
  phone: string;
  message?: string | null;
  status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
  bookingDate: string;
  userId?: string | null;
  batchId: string;
  batch?: OfflineBatch;
}

export interface CreateOfflineBookingInput {
  name: string;
  email: string;
  phone: string;
  message?: string | null;
  batchId: string;
  userId?: string | null;
}
