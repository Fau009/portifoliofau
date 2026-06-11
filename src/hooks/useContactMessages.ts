import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { ContactMessage } from '@/types';

export function useContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setMessages((data ?? []) as ContactMessage[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const markAsRead = async (id: string, read: boolean) => {
    await supabase.from('contact_messages').update({ read }).eq('id', id);
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read } : m)));
  };

  const removeMessage = async (id: string) => {
    await supabase.from('contact_messages').delete().eq('id', id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  return { messages, loading, error, refetch: fetchMessages, markAsRead, removeMessage };
}

export async function sendContactMessage(payload: { name: string; email: string; message: string }) {
  return supabase.from('contact_messages').insert(payload);
}
