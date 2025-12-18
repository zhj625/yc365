import React from 'react';

export type Language = 'en' | 'zh';

export interface Market {
  id: string;
  title: string;
  iconUrl: string;
  percentage: number;
  volume: string; // e.g., "$ 14K Vol."
  category: string;
  endDate: string;
  // Social proof & trends
  traders?: string[]; // Array of avatar URLs
  commentCount?: number;
  change24h?: number; // Percentage change, e.g., 12 or -5
  isHot?: boolean;
  tags?: string[]; // New: For filtering by specific tags like 'trump', 'ai'
  rules?: string;
}

export interface Category {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface FilterTag {
  id: string;
  label: string;
}