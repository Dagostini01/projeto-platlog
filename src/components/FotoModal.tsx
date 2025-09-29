import { useState, useEffect } from "react";
import { fetchNotaFoto } from "../services/notas";
import { fetchPaleteFoto } from "../services/paletes";

interface FotoModalProps {
  notaId?: number | null;
  numeroNota?: number | null;
  paleteId?: number | null;
  numeroPallet?: string | null;
  tipo?: "nota" | "palete" | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function FotoModal({ notaId, numeroNota, paleteId, numeroPallet, tipo, isOpen, onClose }: FotoModalProps) {
  const [fotoUrl, setFotoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && ((tipo === "nota" && notaId) || (tipo === "palete" && paleteId))) {
      carregarFoto();
    }
    
    // Cleanup: limpar URL do blob quando o componente for desmontado ou IDs mudarem
    return () => {
      if (fotoUrl) {
        URL.revokeObjectURL(fotoUrl);
      }
    };
  }, [isOpen, notaId, paleteId, tipo]);

  const carregarFoto = async () => {
    if (!((tipo === "nota" && notaId) || (tipo === "palete" && paleteId))) return;
    
    try {
      setLoading(true);
      setError(null);
      let foto: string;
      
      if (tipo === "nota" && notaId) {
        foto = await fetchNotaFoto(notaId);
      } else if (tipo === "palete" && paleteId) {
        foto = await fetchPaleteFoto(paleteId);
      } else {
        throw new Error("Tipo ou ID inválido");
      }
      
      setFotoUrl(foto);
    } catch (err) {
      setError(`Erro ao carregar a foto ${tipo === "nota" ? "da nota" : "do palete"}`);
      console.error("Erro ao buscar foto:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    // Limpar a URL do blob para evitar vazamentos de memória
    if (fotoUrl) {
      URL.revokeObjectURL(fotoUrl);
    }
    setFotoUrl(null);
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] w-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
          <h3 className="text-lg font-semibold text-gray-800">
            {tipo === "nota" 
              ? `Foto da Nota #${numeroNota || notaId}` 
              : `Foto do Palete #${numeroPallet || paleteId}`
            }
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto flex-1">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="text-gray-500">Carregando foto...</div>
            </div>
          )}
          
          {error && (
            <div className="flex items-center justify-center py-8">
              <div className="text-red-500 text-center">
                <p>{error}</p>
                <button
                  onClick={carregarFoto}
                  className="mt-2 text-blue-600 hover:text-blue-800 underline"
                >
                  Tentar novamente
                </button>
              </div>
            </div>
          )}
          
          {fotoUrl && !loading && !error && (
            <div className="flex justify-center">
              <img
                src={fotoUrl}
                alt={tipo === "nota" 
                  ? `Foto da nota ${numeroNota || notaId}` 
                  : `Foto do palete ${numeroPallet || paleteId}`
                }
                className="max-w-full h-auto object-contain rounded-lg shadow-lg"
                onError={() => setError("Erro ao carregar a imagem")}
              />
            </div>
          )}
        </div>
        
        <div className="flex justify-end p-4 border-t bg-gray-50 flex-shrink-0">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}