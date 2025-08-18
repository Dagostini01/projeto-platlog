import { useEffect, useState } from "react";
import { Nota } from "../../services/notas";

type NotaFormProps = {
  value?: Nota;
  onChange: (patch: Partial<Nota>) => void;
};

export default function NotaForm({ value, onChange }: NotaFormProps) {
  const [numeroRota, setNumeroRota] = useState<number>(value?.numeroRota ?? 0);
  const [numeroNota, setNumeroNota] = useState<number>(value?.numeroNota ?? 0);
  const [tipologia, setTipologia] = useState<string>(value?.tipologia ?? "");
  const [conferidoPor, setConferidoPor] = useState<string>(value?.conferidoPor ?? "");
  const [avaria, setAvaria] = useState<string>(value?.avaria ?? "");

  useEffect(() => {
    onChange({
      numeroRota,
      numeroNota,
      tipologia: tipologia || null,
      conferidoPor: conferidoPor || null,
      avaria: avaria || null,
    });
  }, [numeroRota, numeroNota, tipologia, conferidoPor, avaria]);

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <label className="block text-sm text-gray-600 mb-1">Número da Rota</label>
        <input
          type="number"
          value={numeroRota}
          onChange={(e) => setNumeroRota(Number(e.target.value))}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Número da Nota</label>
        <input
          type="number"
          value={numeroNota}
          onChange={(e) => setNumeroNota(Number(e.target.value))}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Tipologia</label>
        <input
          type="text"
          value={tipologia}
          onChange={(e) => setTipologia(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          placeholder="resfriado, congelado, seco..."
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Conferido por</label>
        <input
          type="text"
          value={conferidoPor}
          onChange={(e) => setConferidoPor(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          placeholder="nome do conferente"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Avaria</label>
        <input
          type="text"
          value={avaria}
          onChange={(e) => setAvaria(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          placeholder="avaria encontrada (se houver)"
        />
      </div>
    </div>
  );
}
