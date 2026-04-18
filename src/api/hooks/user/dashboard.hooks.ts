import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import type { ApiResponse } from "../../../types/api.types";

interface CourseStat {
  id: string;
  title: string;
  level?: string;
  progress: number;
}

interface DashboardMetrics {
  enrolledCoursesCount: number;
  learningHours: number;
  certificatesCount: number;
  courses: CourseStat[];
}

export const useStudentDashboard = () => {
  return useQuery({
    queryKey: ["studentDashboard"],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<DashboardMetrics>>("/users/dashboard");
      return data.data;
    },
  });
};
