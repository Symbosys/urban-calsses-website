
export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  thumbnail?: {
    secure_url: string;
    public_id: string;
  } | null;
  category?: string | null;
  tags: string[];
  isPublished: boolean;
  publishedAt?: string | null;
  authorName?: string | null;
  authorImage?: {
    secure_url: string;
    public_id: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface BlogFilters {
  category?: string;
  search?: string;
  tag?: string;
}
