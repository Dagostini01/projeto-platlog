import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buscarUsuarios } from "../services/api";
import { LockClosedIcon } from "@heroicons/react/24/outline";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const usuarios = await buscarUsuarios();
      const usuario = usuarios.find(
        (u: any) => u.email === email && u.senha === senha
      );

      if (usuario) {
        // ✅ Salva o usuário logado no localStorage
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

        alert(`Bem-vindo(a), ${usuario.nome}!`);
        navigate("/dashboard"); // ou "/perfil" se preferir ir direto
      } else {
        alert("Usuário ou senha incorretos.");
      }
    } catch (error) {
      alert("Erro ao realizar login.");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-blue-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex items-center mb-6">
          <LockClosedIcon className="w-6 h-6 text-blue-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>
        </div>

        <input
          type="email"
          placeholder="Seu e-mail"
          className="border border-gray-300 rounded px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Sua senha"
          className="border border-gray-300 rounded px-4 py-2 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 w-full rounded"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;
