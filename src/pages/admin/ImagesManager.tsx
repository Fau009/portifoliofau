import { useEffect, useState } from 'react';
import { Upload, Trash2, Copy } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

interface ImageFile {
  name: string;
  url: string;
}

const BUCKET = 'site-images';

export default function ImagesManager() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const fetchImages = async () => {
    setLoading(true);
    const { data } = await supabase.storage.from(BUCKET).list('uploads', {
      sortBy: { column: 'created_at', order: 'desc' },
    });

    const files = (data ?? [])
      .filter((f) => f.id !== null)
      .map((f) => {
        const path = `uploads/${f.name}`;
        const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
        return { name: f.name, url: urlData.publicUrl };
      });

    setImages(files);
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileName = `uploads/${Date.now()}-${file.name}`;
    await supabase.storage.from(BUCKET).upload(fileName, file);
    setUploading(false);
    fetchImages();
  };

  const handleDelete = async (name: string) => {
    if (!confirm('Excluir esta imagem?')) return;
    await supabase.storage.from(BUCKET).remove([`uploads/${name}`]);
    fetchImages();
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Imagens</h1>
          <p className="mt-1 text-sm text-text-secondary">Faça upload e gerencie imagens do site.</p>
        </div>
        <label className="btn-primary cursor-pointer">
          <Upload size={18} />
          {uploading ? 'Enviando...' : 'Enviar imagem'}
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        </label>
      </div>

      {loading ? (
        <p className="mt-8 text-text-secondary">Carregando...</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((img) => (
            <div key={img.name} className="card p-2">
              <img src={img.url} alt={img.name} className="aspect-square w-full rounded object-cover" />
              <p className="mt-2 truncate font-mono text-xs text-text-secondary" title={img.name}>
                {img.name}
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(img.url)}
                  className="flex flex-1 items-center justify-center gap-1 rounded-md border border-text-secondary/20 py-1.5 text-xs hover:border-gold hover:text-gold"
                >
                  <Copy size={14} />
                  {copied === img.url ? 'Copiado!' : 'Copiar URL'}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(img.name)}
                  aria-label={`Excluir ${img.name}`}
                  className="rounded-md border border-text-secondary/20 p-1.5 hover:border-red-400 hover:text-red-500"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}

          {images.length === 0 && <p className="text-text-secondary">Nenhuma imagem enviada ainda.</p>}
        </div>
      )}
    </div>
  );
}
