import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { mockProjects } from '@/lib/mockData';
import type { Project } from '@/types';

interface UseProjectsOptions {
  /** Se true, busca todos os projetos (inclusive rascunhos) - uso administrativo */
  includeAll?: boolean;
}

export function useProjects(options: UseProjectsOptions = {}) {
  const { includeAll = false } = options;
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    let query = supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (!includeAll) {
      query = query.eq('status', 'published');
    }

    const { data, error: fetchError } = await query;

    if (fetchError || !data) {
      // Fallback para dados mockados quando o Supabase não está configurado/disponível
      const fallback = includeAll
        ? mockProjects
        : mockProjects.filter((p) => p.status === 'published');
      setProjects(fallback);
      setError(fetchError?.message ?? null);
    } else {
      setProjects(data as Project[]);
    }

    setLoading(false);
  }, [includeAll]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, loading, error, refetch: fetchProjects };
}
