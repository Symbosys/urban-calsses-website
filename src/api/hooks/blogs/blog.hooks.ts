import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { BlogFilters } from "../../../types/blogs/blog.types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

export const useBlogs = (params: BlogFilters = {}) => {
  return useQuery({
    queryKey: ["blogs", params],
    queryFn: async () => {
      // For website, we only fetch published blogs
      const { data } = await axios.get(`${API_URL}/blogs`, { 
        params: { ...params, isPublished: true } 
      });
      return data.data;
    },
  });
};

export const useBlog = (idOrSlug: string) => {
  return useQuery({
    queryKey: ["blogs", idOrSlug],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/blogs/${idOrSlug}`);
      return data.data;
    },
    enabled: !!idOrSlug,
  });
};
