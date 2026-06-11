export type ProjectCategory = 'bcr' | 'personal' | 'events';
export type ProjectStatus = 'published' | 'draft';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string | null;
  technologies: string[];
  external_url: string | null;
  cover_image_url: string | null;
  featured: boolean;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
}

export interface SiteConfig {
  key: string;
  value: Record<string, unknown>;
  updated_at: string;
}

export interface ThemeColors {
  navyDeep: string;
  navyMedium: string;
  gold: string;
  goldLight: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
}

export interface CustomPage {
  id: string;
  slug: string;
  title: string;
  content: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface TechItem {
  name: string;
  level: number; // 0-100
  category: 'cx' | 'dev' | 'infra' | 'ai' | 'design';
}
