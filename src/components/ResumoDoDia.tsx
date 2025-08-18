import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  fetchNotas,
  deleteNota,
  updateNota,
  type Nota,
} from "../services/notas";
import {
  fetchPaletes,
  deletePalete,
  updatePalete,
  type Palete,
} from "../services/paletes";
import EditModal from "./forms/EditModal";
import NotaForm from "./forms/NotaForm";
import PaleteForm from "./forms/PaleteForm";

function BadgeAvaria({ texto }: { texto: string }) {
  return (
    <span className="ml-2 inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
      {texto}
    </span>
  );
}

export default function ResumoDoDia() {
  const [dia, setDia] = useState(() => format(new Date(), "yyyy-MM-dd"));
  const [rota, setRota] = useState<string>("");
  const [notas, setNotas] = useState<Nota[]>([]);
  const [paletes, setPaletes] = useState<Palete[]>([]);
  const [carregando, setCarregando] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editTipo, setEditTipo] = useState<"nota" | "palete" | null>(null);
  const [notaEdit, setNotaEdit] = useState<Nota | null>(null);
  const [paleteEdit, setPaleteEdit] = useState<Palete | null>(null);
  const [patchNota, setPatchNota] = useState<Partial<Nota>>({});
  const [patchPalete, setPatchPalete] = useState<Partial<Palete>>({});

  const carregarDados = async () => {
    try {
      setCarregando(true);
      const rotaParam = rota.trim() || undefined;
      const [n, p] = await Promise.all([
        fetchNotas(dia, rotaParam),
        fetchPaletes(dia, rotaParam),
      ]);
      setNotas(n);
      setPaletes(p);
    } catch (err) {
      alert("Erro ao buscar dados");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const removerNota = async (id: number) => {
    if (confirm("Deseja deletar essa nota?")) {
      await deleteNota(id);
      carregarDados();
    }
  };

  const removerPalete = async (id: number) => {
    if (confirm("Deseja deletar esse palete?")) {
      await deletePalete(id);
      carregarDados();
    }
  };

  const abrirEditarNota = (n: Nota) => {
    setEditTipo("nota");
    setNotaEdit(n);
    setPatchNota({});
    setEditOpen(true);
  };

  const abrirEditarPalete = (p: Palete) => {
    setEditTipo("palete");
    setPaleteEdit(p);
    setPatchPalete({});
    setEditOpen(true);
  };

  const salvarEdicao = async () => {
    try {
      setSaving(true);
      if (editTipo === "nota" && notaEdit) {
        await updateNota(notaEdit.id, patchNota);
      } else if (editTipo === "palete" && paleteEdit) {
        await updatePalete(paleteEdit.id, patchPalete);
      }
      setEditOpen(false);
      setNotaEdit(null);
      setPaleteEdit(null);
      await carregarDados();
    } catch (e: any) {
      alert(e?.message ?? "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Resumo do Dia</h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="date"
          value={dia}
          onChange={(e) => setDia(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-auto"
        />
        <input
          type="text"
          value={rota}
          onChange={(e) => setRota(e.target.value)}
          placeholder="Filtrar por rota (opcional)"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-56"
        />
        <button
          onClick={carregarDados}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200"
        >
          Buscar
        </button>
      </div>

      {carregando && (
        <p className="text-sm text-gray-500 italic mb-4">
          Carregando dados...
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notas */}
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Notas</h3>
          {notas.length === 0 ? (
            <p className="text-sm text-gray-500">Nenhuma nota encontrada.</p>
          ) : (
            <ul className="divide-y divide-blue-200">
              {notas.map((nota) => (
                <li
                  key={nota.id}
                  className="py-3 flex justify-between items-center gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm text-gray-800 truncate">
                      <strong>Rota:</strong> {nota.numeroRota} &nbsp; | &nbsp;
                      <strong>Nota:</strong> {nota.numeroNota}
                      {nota.avaria === "sim" && <BadgeAvaria texto="Avaria" />}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      Tipologia: {nota.tipologia ?? "—"} | Conferido:{" "}
                      {nota.conferidoPor ?? "—"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => abrirEditarNota(nota)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => removerNota(nota.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Deletar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Paletes */}
        <div className="bg-green-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-green-800 mb-3">Paletes</h3>
          {paletes.length === 0 ? (
            <p className="text-sm text-gray-500">Nenhum palete encontrado.</p>
          ) : (
            <ul className="divide-y divide-green-200">
              {paletes.map((palete) => (
                <li
                  key={palete.id}
                  className="py-3 flex justify-between items-center gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm text-gray-800 truncate">
                      <strong>Rota:</strong> {palete.numeroRota} &nbsp; | &nbsp;
                      <strong>Palete:</strong> {palete.numeroPallet}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      Tipologia: {palete.tipologia ?? "—"} | Remontado:{" "}
                      {palete.remontado} | Conferido: {palete.conferido}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => abrirEditarPalete(palete)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => removerPalete(palete.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Deletar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* MODAL DE EDIÇÃO */}
      <EditModal
        title={
          editTipo === "nota"
            ? `Editar Nota #${notaEdit?.id}`
            : editTipo === "palete"
              ? `Editar Palete #${paleteEdit?.id}`
              : ""
        }
        open={editOpen}
        onClose={() => {
          if (!saving) {
            setEditOpen(false);
            setNotaEdit(null);
            setPaleteEdit(null);
          }
        }}
        onSave={salvarEdicao}
        saving={saving}
      >
        {editTipo === "nota" && notaEdit && (
          <NotaForm value={notaEdit} onChange={setPatchNota} />
        )}
        {editTipo === "palete" && paleteEdit && (
          <PaleteForm value={paleteEdit} onChange={setPatchPalete} />
        )}
      </EditModal>
    </div>
  );
}
