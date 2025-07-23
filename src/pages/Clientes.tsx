import { useState } from "react";
import { Cliente } from "../types";
import { mockClientes } from "../services/mock";

function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>(mockClientes);
  const [novoNome, setNovoNome] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [novoTel, setNovoTel] = useState("");

  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [editNome, setEditNome] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editTel, setEditTel] = useState("");

  const criarCliente = () => {
    if (!novoNome) return;
    const novo: Cliente = {
      id: (clientes.length + 1).toString(),
      nome: novoNome,
      email: novoEmail,
      telefone: novoTel,
      projetos: [],
    };
    setClientes([novo, ...clientes]);
    setNovoNome("");
    setNovoEmail("");
    setNovoTel("");
  };

  const excluirCliente = (id: string) => {
    if (confirm("Tem certeza que deseja excluir?")) {
      setClientes(clientes.filter((c) => c.id !== id));
    }
  };

  const iniciarEdicao = (cliente: Cliente) => {
    setEditandoId(cliente.id);
    setEditNome(cliente.nome);
    setEditEmail(cliente.email || "");
    setEditTel(cliente.telefone || "");
  };

  const salvarEdicao = () => {
    if (!editandoId) return;
    setClientes(clientes.map((c) =>
      c.id === editandoId
        ? { ...c, nome: editNome, email: editEmail, telefone: editTel }
        : c
    ));
    cancelarEdicao();
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setEditNome("");
    setEditEmail("");
    setEditTel("");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Clientes</h2>

      {/* Formulário de novo cliente */}
      <div className="mb-6 space-y-2 bg-white p-4 rounded shadow-sm">
        <h3 className="font-semibold">Novo Cliente</h3>
        <input
          placeholder="Nome"
          className="border p-2 w-full"
          value={novoNome}
          onChange={(e) => setNovoNome(e.target.value)}
        />
        <input
          placeholder="E-mail"
          className="border p-2 w-full"
          value={novoEmail}
          onChange={(e) => setNovoEmail(e.target.value)}
        />
        <input
          placeholder="Telefone"
          className="border p-2 w-full"
          value={novoTel}
          onChange={(e) => setNovoTel(e.target.value)}
        />
        <button
          onClick={criarCliente}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Adicionar
        </button>
      </div>

      {/* Lista de clientes */}
      <ul className="space-y-4">
        {clientes.map((cliente) => (
          <li key={cliente.id} className="border p-4 rounded shadow-sm bg-white">
            {editandoId === cliente.id ? (
              <>
                <input
                  className="border p-2 w-full mb-2"
                  value={editNome}
                  onChange={(e) => setEditNome(e.target.value)}
                />
                <input
                  className="border p-2 w-full mb-2"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                />
                <input
                  className="border p-2 w-full mb-2"
                  value={editTel}
                  onChange={(e) => setEditTel(e.target.value)}
                />
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
                <div className="font-bold">{cliente.nome}</div>
                <div className="text-sm text-gray-600">
                  Email: {cliente.email || "N/A"} | Tel: {cliente.telefone || "N/A"}
                </div>
                <div className="text-sm mt-1">Projetos: {cliente.projetos.length}</div>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => iniciarEdicao(cliente)}
                    className="text-blue-600 text-sm underline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => excluirCliente(cliente.id)}
                    className="text-red-600 text-sm underline"
                  >
                    Excluir
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Clientes;
