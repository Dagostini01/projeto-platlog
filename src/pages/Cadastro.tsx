import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cadastrarUsuario } from "../services/api";
import { UserPlusIcon } from "@heroicons/react/24/outline";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [role, setRole] = useState<"admin" | "comum">("comum");
  const navigate = useNavigate();

  const handleCadastro = async () => {
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      await cadastrarUsuario({ nome, email, senha, role });
      alert("Usuário cadastrado com sucesso!");
      navigate("/login");
    } catch (error) {
      alert("Erro ao cadastrar usuário.");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-blue-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex items-center mb-6">
          <UserPlusIcon className="w-6 h-6 text-blue-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">Criar conta</h2>
        </div>

        <input
          type="text"
          placeholder="Seu nome"
          className="border border-gray-300 rounded px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="email"
          placeholder="Seu e-mail"
          className="border border-gray-300 rounded px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="border border-gray-300 rounded px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirmar senha"
          className="border border-gray-300 rounded px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />

        <select
          className="border border-gray-300 rounded px-4 py-2 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={role}
          onChange={(e) => setRole(e.target.value as "admin" | "comum")}
        >
          <option value="comum">Usuário Comum</option>
          <option value="admin">Administrador</option>
        </select>

        <button
          onClick={handleCadastro}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 w-full rounded"
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
}

export default Cadastro;
