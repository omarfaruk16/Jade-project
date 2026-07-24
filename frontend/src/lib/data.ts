import { cache } from 'react';
import API_BASE from './api';

async function getJSON<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${path}`, { cache: 'no-store' });
    if (!res.ok) return fallback;
    return await res.json();
  } catch {
    return fallback;
  }
}

export const getServices = cache(() => getJSON<any[]>('/services', []));
export const getServiceChildren = cache(() => getJSON<any[]>('/services/children', []));
export const getServiceChildBySlug = cache((slug: string) => getJSON<any>(`/services/child/${slug}`, { error: true }));

export const getProductCategories = cache(() => getJSON<any[]>('/products/categories', []));
export const getProductCategoryBySlug = cache((slug: string) => getJSON<any>(`/products/categories/${slug}`, { error: true }));
export const getProductById = cache((id: string) => getJSON<any>(`/products/${id}`, { error: true }));

export const getTestimonials = cache(() => getJSON<any[]>('/testimonials', []));
export const getTeamMembers = cache(() => getJSON<any[]>('/team', []));
export const getFaqs = cache(() => getJSON<any[]>('/faq', []));

export const getBlogs = cache(() => getJSON<any[]>('/blogs', []));
export const getRecentBlogs = cache((limit: number) => getJSON<any[]>(`/blogs/recent?limit=${limit}`, []));
export const getBlogBySlug = cache((slug: string) => getJSON<any>(`/blogs/${slug}`, { error: true }));

export const getProjects = cache(() => getJSON<any[]>('/projects', []));
export const getProjectById = cache((id: string) => getJSON<any>(`/projects/${id}`, { error: true }));

export const getPromotions = cache(() => getJSON<any[]>('/promotions', []));
export const getPartners = cache((page: string) => getJSON<any[]>(`/partners?page=${page}`, []));
export const getContact = cache(() => getJSON<any>('/contact', null));
