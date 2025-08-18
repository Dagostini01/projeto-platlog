import { useEffect, useState } from "react";
import { Palete } from "../../services/paletes";

type PaleteFormProps = {
  value?: Palete;
  onChange: (patch: Partial<Palete>) => void;
};

export default function PaleteForm({ value, onChange }: PaleteFormProps) {
  const [numeroRota, setNumeroRota] = useState<number>(value?.numeroRota ?? 0);
  const [numeroPallet, setNumeroPallet] = useState<string>(value?.numeroPallet ?? "");
  const [tipologia, setTipologia] = useState<string>(value?.tipologia ?? "");
  const [remontado, setRemontado] = useState<string>(value?.remontado ?? "nao");
  const [conferido, setConferido] = useState<string>(value?.conferido ?? "nao");

  useEffect(() => {
    onChange({
      numeroRota: Number(numeroRota),
      numeroPallet: numeroPallet,
      tipologia: tipologia || null,
      remontado,
      conferido,
    } as Partial<Palete>);
  }, [numeroRota, numeroPallet, tipologia, remontado, conferido]);

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
        <label className="block text-sm text-gray-600 mb-1">Número do Palete</label>
        <input
          type="text"
          value={numeroPallet}
          onChange={(e) => setNumeroPallet(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          placeholder="ex.: 123, sem bandeira"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Tipologia</label>
        <input
          type="text"
          value={tipologia ?? ""}
          onChange={(e) => setTipologia(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Remontado</label>
          <select
            className="w-full border rounded-lg px-3 py-2"
            value={remontado}
            onChange={(e) => setRemontado(e.target.value)}
          >
            <option value="nao">não</option>
            <option value="sim">sim</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Conferido</label>
          <select
            className="w-full border rounded-lg px-3 py-2"
            value={conferido}
            onChange={(e) => setConferido(e.target.value)}
          >
            <option value="nao">não</option>
            <option value="sim">sim</option>
          </select>
        </div>
      </div>
    </div>
  );
}
