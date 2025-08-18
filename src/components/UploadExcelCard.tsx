import { useRef, useState, ChangeEvent } from "react";

type UploadResult = {
  ok: boolean;
  table?: string;
  inserted?: number;
  batchSize?: number;
  columns?: string[];
  message?: string;
  [k: string]: any;
};

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

export default function UploadExcelCard() {
  const [file, setFile] = useState<File | null>(null);
  const [table, setTable] = useState("nf_platlog");
  const [drop, setDrop] = useState(true);
  const [bulk, setBulk] = useState(true);

  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0); // 0–100
  const [speed, setSpeed] = useState<string>(""); // KB/s ~ MB/s
  const [eta, setEta] = useState<string>(""); // tempo estimado

  const [clearing, setClearing] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const xhrRef = useRef<XMLHttpRequest | null>(null);
  const lastTickRef = useRef<{ time: number; loaded: number } | null>(null);

  const onPick = (e: ChangeEvent<HTMLInputElement>) => {
    setResult(null);
    setError(null);
    setFile(e.target.files?.[0] ?? null);
    setProgress(0);
    setSpeed("");
    setEta("");
  };

  const human = (bytesPerSec: number) => {
    if (!isFinite(bytesPerSec) || bytesPerSec <= 0) return "";
    if (bytesPerSec < 1024) return `${bytesPerSec.toFixed(0)} B/s`;
    if (bytesPerSec < 1024 * 1024) return `${(bytesPerSec / 1024).toFixed(1)} KB/s`;
    return `${(bytesPerSec / (1024 * 1024)).toFixed(1)} MB/s`;
  };

  const send = async () => {
    if (!file) { setError("Selecione um arquivo .xlsx primeiro."); return; }
    if (!table.trim()) { setError("Informe o nome da tabela."); return; }

    setIsUploading(true);
    setProgress(0);
    setSpeed("");
    setEta("");
    setError(null);
    setResult(null);

    const form = new FormData();
    form.append("file", file, file.name);
    const url = `${API_BASE}/excel/${encodeURIComponent(table)}?drop=${drop ? 1 : 0}&bulk=${bulk ? 1 : 0}`;

    const xhr = new XMLHttpRequest();
    xhrRef.current = xhr;

    xhr.open("POST", url, true);

    // progresso de upload
    xhr.upload.onprogress = (evt) => {
      if (!evt.lengthComputable) return;
      const pct = Math.round((evt.loaded / evt.total) * 100);
      setProgress(pct);

      // calcular velocidade / ETA
      const now = performance.now();
      const tick = lastTickRef.current;
      if (!tick) {
        lastTickRef.current = { time: now, loaded: evt.loaded };
      } else {
        const dt = (now - tick.time) / 1000; // segundos
        const dB = evt.loaded - tick.loaded; // bytes
        if (dt > 0) {
          const bytesPerSec = dB / dt;
          setSpeed(human(bytesPerSec));
          const remaining = evt.total - evt.loaded;
          const secLeft = remaining / (bytesPerSec || 1);
          if (isFinite(secLeft) && secLeft >= 0) {
            const m = Math.floor(secLeft / 60);
            const s = Math.floor(secLeft % 60);
            setEta(m > 0 ? `${m}m ${s}s` : `${s}s`);
          }
        }
        lastTickRef.current = { time: now, loaded: evt.loaded };
      }
    };

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        setIsUploading(false);
        xhrRef.current = null;
        lastTickRef.current = null;

        try {
          const json = JSON.parse(xhr.responseText || "{}");
          if (xhr.status >= 200 && xhr.status < 300 && json?.ok !== false) {
            setResult(json);
            setFile(null);
            setProgress(100);
            setSpeed("");
            setEta("");
          } else {
            setError(json?.message || "Falha no upload");
          }
        } catch {
          setError(xhr.statusText || "Falha no upload");
        }
      }
    };

    xhr.onerror = () => {
      setIsUploading(false);
      xhrRef.current = null;
      lastTickRef.current = null;
      setError("Erro de rede durante o upload.");
    };

    xhr.send(form);
  };

  const cancelUpload = () => {
    try {
      xhrRef.current?.abort();
    } catch {}
    setIsUploading(false);
    xhrRef.current = null;
    lastTickRef.current = null;
    setProgress(0);
    setSpeed("");
    setEta("");
  };

  const clearTable = async () => {
    if (!table.trim()) { setError("Informe o nome da tabela para limpar."); return; }
    if (!confirm(`Apagar TODOS os dados da tabela "${table}"?`)) return;

    try {
      setClearing(true);
      setError(null);
      const url = `${API_BASE}/excel/${encodeURIComponent(table)}`;
      const res = await fetch(url, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok || json?.ok === false) throw new Error(json?.message || "Falha ao limpar a tabela.");
      setResult(json);
    } catch (err: any) {
      setError(err?.message ?? "Erro ao limpar a tabela.");
    } finally {
      setClearing(false);
    }
  };

  const canSend = !!file && !!table.trim() && !isUploading;
  const canClear = !!table.trim() && !clearing && !isUploading;

  return (
    <div className="bg-white p-4 rounded shadow mb-8">
      <h2 className="text-lg font-semibold mb-3">Importar Excel para o Banco</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-end">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Arquivo (.xlsx / .xls)</label>
          <input
            type="file"
            accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
            onChange={onPick}
            className="block w-full text-sm file:mr-3 file:py-2 file:px-3 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
          {file && <p className="text-xs text-gray-500 mt-1">Selecionado: {file.name}</p>}
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Nome da tabela</label>
          <input
            value={table}
            onChange={(e) => setTable(e.target.value)}
            placeholder="ex.: nf_platlog"
            className="w-full border rounded px-3 py-2 text-sm"
          />
          <p className="text-[11px] text-gray-500 mt-1">
            Endpoints: <span className="font-mono">POST /excel/{table || "<tabela>"}</span> &nbsp;|&nbsp;{" "}
            <span className="font-mono">DELETE /excel/{table || "<tabela>"}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={drop} onChange={(e) => setDrop(e.target.checked)} className="h-4 w-4" />
            Recriar tabela (drop=1)
          </label>

          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={bulk} onChange={(e) => setBulk(e.target.checked)} className="h-4 w-4" />
            Usar Bulk (rápido)
          </label>

          <div className="ml-auto flex gap-2">
            <button
              onClick={clearTable}
              disabled={!canClear}
              className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded px-4 py-2 disabled:opacity-60"
            >
              {clearing ? "Limpando..." : "Limpar Tabela"}
            </button>

            {!isUploading ? (
              <button
                onClick={send}
                disabled={!canSend}
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded px-4 py-2 disabled:opacity-60"
              >
                Enviar Excel
              </button>
            ) : (
              <button
                onClick={cancelUpload}
                className="inline-flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded px-4 py-2"
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Barra de progresso */}
      {isUploading && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
            <span>Enviando arquivo…</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded h-3 overflow-hidden">
            <div
              className="h-3 bg-blue-600 transition-all"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
            <span>{speed && `Velocidade: ${speed}`}</span>
            <span>{eta && `Restante: ${eta}`}</span>
          </div>
        </div>
      )}

      {/* mensagens */}
      {error && (
        <div className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-3">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-4 text-sm bg-green-50 border border-green-200 rounded p-3">
          <p className="font-medium text-green-800 mb-1">
            {result.message ? "Operação concluída" : "Importação concluída"}
          </p>
          <ul className="list-disc pl-5 text-green-900 space-y-0.5">
            {"message" in result && result.message && <li>{result.message}</li>}
            {"table" in result && <li>Tabela: <b>{result.table}</b></li>}
            {"inserted" in result && <li>Linhas inseridas: <b>{result.inserted}</b></li>}
            {"batchSize" in result && <li>Lote: <b>{result.batchSize}</b></li>}
            {"columns" in result && Array.isArray(result.columns) && (
              <li>Colunas detectadas: <span className="font-mono break-all">{result.columns.join(", ")}</span></li>
            )}
          </ul>
        </div>
      )}

      <p className="mt-3 text-xs text-gray-500">
        API: <span className="font-mono">{API_BASE}</span>
      </p>
    </div>
  );
}
