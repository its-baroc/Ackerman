export type CategoryId =
  | 'all'
  | 'breakfast'
  | 'tibs'
  | 'traditional'
  | 'fasting'
  | 'vegetables'
  | 'burgers'
  | 'sandwiches'
  | 'pizza'
  | 'soup'
  | 'juice'
  | 'hot_drinks'
  | 'soft_drinks'
  | 'beer'
  | 'wine'
  | 'whiskey'
  | 'vodka'
  | 'spirits';

export type LanguageMode = 'both' | 'en' | 'am';

export interface MenuItem {
  id: string;
  categoryId: CategoryId;
  nameEn: string;
  nameAm: string;
  descriptionEn?: string;
  descriptionAm?: string;
  price: number;
  unit?: string;
  isSpecial?: boolean;
  isFasting?: boolean;
  spicyLevel?: 0 | 1 | 2 | 3;
  popular?: boolean;
  imageThumbnail?: string;
  sourcePage?: number; // 1 to 9 matching uploaded menu scans
}

export interface Category {
  id: CategoryId;
  nameEn: string;
  nameAm: string;
  icon: string;
  descriptionEn: string;
  descriptionAm: string;
}

export interface OrderItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}
