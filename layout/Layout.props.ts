import { ReactNode } from 'react';
import { MenuItem } from '../interfaces/menu.interface';
import { TopLevelCategory } from '../interfaces/page.interface';

export interface LayoutProps {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  year: number;
  children: ReactNode;
}
