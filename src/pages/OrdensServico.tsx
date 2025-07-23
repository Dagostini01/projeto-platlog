import { useState } from "react";
import { OrdemServico } from "../types";
import { mockClientes } from "../services/mock";

function OrdensServico() {
  const [clientes, setClientes] = useState(mockClientes);

  const todosProjetos = clientes.flatMap((c) =>
    c.projetos.map((p) => ({
      ...p,
      clienteNome: c.nome,
    }))
  );

  const [descricao, setDescricao] = useState("");
  const [projetoId, setProjetoId] = useState("");
  const [status, setStatus] = useState<OrdemServico["status"]>("aberta");

  const [editId, setEditId] = useState<string | null>(null);
  const [editDesc, setEditDesc] = useState("");
  const [editStatus, setEditStatus] = useState<OrdemServico["status"]>("aberta");

  const criarOS = () => {
    if (!descricao || !projetoId) return;
    const nova: OrdemServico = {
      id: "os" + Date.now(),
      descricao,
      status,
      projetoId,
    };

    setClientes(clientes.map((c) => ({
      ...c,
      projetos: c.projetos.map((p) =>
        p.id === projetoId
          ? { ...p, ordensServico: [nova, ...p.ordensServico] }
          : p
      ),
    })));

    setDescricao("");
    setProjetoId("");
    setStatus("aberta");
  };

  const excluirOS = (id: string) => {
    if (!confirm("Deseja realmente excluir?")) return;
    setClientes(clientes.map((c) => ({
      ...c,
      projetos: c.projetos.map((p) => ({
        ...p,
        ordensServico: p.ordensServico.filter((os) => os.id !== id)
      }))
    })));
  };

  const iniciarEdicao = (os: OrdemServico) => {
    setEditId(os.id);
    setEditDesc(os.descricao);
    setEditStatus(os.status);
  };

  const salvarEdicao = () => {
    if (!editId) return;
    setClientes(clientes.map((c) => ({
      ...c,
      projetos: c.projetos.map((p) => ({
        ...p,
        ordensServico: p.ordensServico.map((os) =>
          os.id === editId ? { ...os, descricao: editDesc, status: editStatus } : os
        )
      }))
    })));
    setEditId(null);
    setEditDesc("");
    setEditStatus("aberta");
  };

  const cancelarEdicao = () => {
    setEditId(null);
    setEditDesc("");
    setEditStatus("aberta");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Ordens de Serviço</h2>

      <div className="bg-white p-4 rounded shadow-sm mb-6 space-y-2">
        <h3 className="font-semibold">Nova OS</h3>
        <input
          placeholder="Descrição"
          className="border p-2 w-full"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <select
          className="border p-2 w-full"
          value={projetoId}
          onChange={(e) => setProjetoId(e.target.value)}
        >
          <option value="">Selecione o projeto</option>
          {todosProjetos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome} ({p.clienteNome})
            </option>
          ))}
        </select>
        <select
          className="border p-2 w-full"
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
        >
          <option value="aberta">Aberta</option>
          <option value="em andamento">Em andamento</option>
          <option value="concluída">Concluída</option>
        </select>
        <button
          onClick={criarOS}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Adicionar
        </button>
      </div>

      <ul className="space-y-4">
        {clientes.flatMap((c) =>
          c.projetos.flatMap((p) =>
            p.ordensServico.map((os) => (
              <li key={os.id} className="border p-4 rounded bg-white shadow-sm">
                {editId === os.id ? (
                  <>
                    <input
                      className="border p-2 w-full mb-2"
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                    />
                    <select
                      className="border p-2 w-full mb-2"
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value as any)}
                    >
                      <option value="aberta">Aberta</option>
                      <option value="em andamento">Em andamento</option>
                      <option value="concluída">Concluída</option>
                    </select>
                    <div className="flex gap-2">
                      <button
                        onClick={salvarEdicao}
                        className="bg-green-600 text-white px-4 py-1 rounded"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={cancelarEdicao}
                        className="bg-gray-400 text-white px-4 py-1 rounded"
                      >
                        Cancelar
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="font-bold">{os.id}: {os.descricao}</p>
                    <p className="text-sm text-gray-600">Projeto: {p.nome} | Cliente: {c.nome}</p>
                    <p className="text-sm">Status: {os.status}</p>
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => iniciarEdicao(os)}
                        className="text-blue-600 text-sm underline"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => excluirOS(os.id)}
                        className="text-red-600 text-sm underline"
                      >
                        Excluir
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))
          )
        )}
      </ul>
    </div>
  );
}

export default OrdensServico;
