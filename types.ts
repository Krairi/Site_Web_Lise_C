import { LucideIcon } from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  isPromo?: boolean;
  image: string;
}

export interface ListItem extends Product {
  quantity: number;
  checked: boolean;
}

export interface StatCard {
  label: string;
  value: string;
  subtext: string;
  icon: LucideIcon;
  color: 'primary' | 'secondary' | 'accent';
}