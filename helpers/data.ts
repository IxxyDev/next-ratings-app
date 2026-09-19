import { cacheLife } from 'next/cache';
import { API } from './api';
import { MenuItem } from '../interfaces/menu.interface';
import { TopLevelCategory, TopPageModel } from '../interfaces/page.interface';
import { ProductModel } from '../interfaces/product.interface';

async function request<T>(url: string, init?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(url, init);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function post<T>(url: string, body: unknown): Promise<T | null> {
  return request<T>(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

export async function getCurrentYear(): Promise<number> {
  'use cache';
  cacheLife('days');
  return new Date().getFullYear();
}

export async function getMenu(firstCategory: TopLevelCategory): Promise<MenuItem[]> {
  'use cache';
  cacheLife('minutes');
  return (await post<MenuItem[]>(API.topPage.find, { firstCategory })) ?? [];
}

export async function getPageByAlias(alias: string): Promise<TopPageModel | null> {
  'use cache';
  cacheLife('minutes');
  return request<TopPageModel>(API.topPage.byAlias + encodeURIComponent(alias));
}

export async function getProducts(category: string, limit = 10): Promise<ProductModel[]> {
  'use cache';
  cacheLife('minutes');
  return (await post<ProductModel[]>(API.product.find, { category, limit })) ?? [];
}
