import { createContext, useContext } from 'react';
import { defaultContent, defaultTheme } from './useSiteConfig';
import type { ThemeColors } from '@/types';

export interface SiteConfigContextValue {
  theme: ThemeColors;
  content: typeof defaultContent;
  loading: boolean;
  refetch: () => Promise<void>;
}

export const SiteConfigContext = createContext<SiteConfigContextValue>({
  theme: defaultTheme,
  content: defaultContent,
  loading: true,
  refetch: async () => {},
});

export function useSiteContent() {
  return useContext(SiteConfigContext);
}
