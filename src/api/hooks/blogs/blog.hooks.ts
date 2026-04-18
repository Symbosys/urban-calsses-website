import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import type { BlogFilters } from "../../../types/blogs/blog.types";

export const useBlogs = (params: BlogFilters = {}) => {
  return useQuery({
    queryKey: ["blogs", params],
    queryFn: async () => {
      // For website, we only fetch published blogs
      const { data } = await api.get("/blogs", { 
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
      const { data } = await api.get(`/blogs/${idOrSlug}`);
      return data.data;
    },
    enabled: !!idOrSlug,
  });
};
