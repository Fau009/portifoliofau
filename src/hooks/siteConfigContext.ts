import { createContext, useContext } from 'react';
import {
  defaultAboutExtra,
  defaultContent,
  defaultFullSolutions,
  defaultHero,
  defaultSpecialties,
  defaultTechnologies,
  defaultTheme,
} from './useSiteConfig';
import type {
  AboutExtra,
  FullSolutionsContent,
  HeroContent,
  SpecialtyItem,
  TechnologiesContent,
  ThemeColors,
} from '@/types';

export interface SiteConfigContextValue {
  theme: ThemeColors;
  content: typeof defaultContent;
  fullSolutions: FullSolutionsContent;
  hero: HeroContent;
  specialties: SpecialtyItem[];
  technologies: TechnologiesContent;
  aboutExtra: AboutExtra;
  loading: boolean;
  refetch: () => Promise<void>;
}

export const SiteConfigContext = createContext<SiteConfigContextValue>({
  theme: defaultTheme,
  content: defaultContent,
  fullSolutions: defaultFullSolutions,
  hero: defaultHero,
  specialties: defaultSpecialties,
  technologies: defaultTechnologies,
  aboutExtra: defaultAboutExtra,
  loading: true,
  refetch: async () => {},
});

export function useSiteContent() {
  return useContext(SiteConfigContext);
}
