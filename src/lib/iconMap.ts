import { createElement, type ReactNode } from 'react';
import {
  Headset,
  Star,
  Brain,
  Code2,
  ClipboardList,
  Cpu,
  Database,
  Cloud,
  Settings,
  Zap,
  Rocket,
  Target,
  TrendingUp,
  Users,
  MessageSquare,
  Globe,
  Shield,
  Layers,
  BarChart3,
  Wrench,
  Lightbulb,
  Sparkles,
  Briefcase,
  Award,
  type LucideIcon,
} from 'lucide-react';

export const ICON_MAP: Record<string, LucideIcon> = {
  Headset,
  Star,
  Brain,
  Code2,
  ClipboardList,
  Cpu,
  Database,
  Cloud,
  Settings,
  Zap,
  Rocket,
  Target,
  TrendingUp,
  Users,
  MessageSquare,
  Globe,
  Shield,
  Layers,
  BarChart3,
  Wrench,
  Lightbulb,
  Sparkles,
  Briefcase,
  Award,
};

export const ICON_OPTIONS = Object.keys(ICON_MAP);

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Sparkles;
}

export function renderIcon(name: string, props?: { className?: string; size?: number }): ReactNode {
  return createElement(getIcon(name), props);
}
