import { createContext, useContext } from 'react';
import { defaultContent, defaultFullSolutions, defaultTheme } from './useSiteConfig';
import type { FullSolutionsContent, ThemeColors } from '@/types';

export interface SiteConfigContextValue {
  theme: ThemeColors;
  content: typeof defaultContent;
  fullSolutions: FullSolutionsContent;
  loading: boolean;
  refetch: () => Promise<void>;
}

export const SiteConfigContext = createContext<SiteConfigContextValue>({
  theme: defaultTheme,
  content: defaultContent,
  fullSolutions: defaultFullSolutions,
  loading: true,
  refetch: async () => {},
});

export function useSiteContent() {
  return useContext(SiteConfigContext);
}
