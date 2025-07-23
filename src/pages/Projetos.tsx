import { useState } from "react";
import { Projeto } from "../types";
import { mockClientes } from "../services/mock";

function Projetos() {
  const [clientes, setClientes] = useState(mockClientes);

  const [nome, setNome] = useState("");
  const [clienteId, setClienteId] = useState("");

  const [editId, setEditId] = useState<string | null>(null);
  const [editNome, setEditNome] = useState("");
  const [editClienteId, setEditClienteId] = useState("");

  const todosProjetos = clientes.flatMap((cliente) =>
    cliente.projetos.map((projeto) => ({
      ...projeto,
      clienteNome: cliente.nome,
    }))
  );

  const criarProjeto = () => {
    if (!nome || !clienteId) return;
    const novoProjeto: Projeto = {
      id: "p" + Date.now(),
      nome,
      clienteId,
      ordensServico: [],
    };

    setClientes(clientes.map((c) =>
      c.id === clienteId
        ? { ...c, projetos: [novoProjeto, ...c.projetos] }
        : c
    ));

    setNome("");
    setClienteId("");
  };

  const excluirProjeto = (id: string) => {
    if (!confirm("Deseja realmente excluir este projeto?")) return;

    setClientes(clientes.map((c) => ({
      ...c,
      projetos: c.projetos.filter((p) => p.id !== id),
    })));
  };

  const iniciarEdicao = (projeto: Projeto) => {
    setEditId(projeto.id);
    setEditNome(projeto.nome);
    setEditClienteId(projeto.clienteId);
  };

  const salvarEdicao = () => {
    if (!editId || !editNome || !editClienteId) return;

    setClientes(clientes.map((c) => ({
      ...c,
      projetos: c.projetos.map((p) =>
        p.id === editId
          ? { ...p, nome: editNome, clienteId: editClienteId }
          : p
      ),
    })));

    setEditId(null);
    setEditNome("");
    setEditClienteId("");
  };

  const cancelarEdicao = () => {
    setEditId(null);
    setEditNome("");
    setEditClienteId("");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Projetos</h2>

      <div className="bg-white p-4 rounded shadow-sm mb-6 space-y-2">
        <h3 className="font-semibold">Novo Projeto</h3>
        <input
          placeholder="Nome do projeto"
          className="border p-2 w-full"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <select
          className="border p-2 w-full"
          value={clienteId}
          onChange={(e) => setClienteId(e.target.value)}
        >
          <option value="">Selecione o cliente</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.id}>{c.nome}</option>
          ))}
        </select>
        <button
          onClick={criarProjeto}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Adicionar
        </button>
      </div>

      <ul className="space-y-4">
        {clientes.flatMap((cliente) =>
          cliente.projetos.map((p) => (
            <li key={p.id} className="border p-4 rounded bg-white shadow-sm">
              {editId === p.id ? (
                <>
                  <input
                    className="border p-2 w-full mb-2"
                    value={editNome}
                    onChange={(e) => setEditNome(e.target.value)}
                  />
                  <select
                    className="border p-2 w-full mb-2"
                    value={editClienteId}
                    onChange={(e) => setEditClienteId(e.target.value)}
                  >
                    {clientes.map((c) => (
                      <option key={c.id} value={c.id}>{c.nome}</option>
                    ))}
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
                  <h3 className="font-bold">{p.nome}</h3>
                  <p className="text-sm text-gray-500">Cliente: {cliente.nome}</p>
                  <p className="text-sm">OSs: {p.ordensServico.length}</p>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => iniciarEdicao(p)}
                      className="text-blue-600 text-sm underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => excluirProjeto(p.id)}
                      className="text-red-600 text-sm underline"
                    >
                      Excluir
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Projetos;
