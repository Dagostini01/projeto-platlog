import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Perfil() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState<any>(null);

  useEffect(() => {
    const userLocal = localStorage.getItem("usuarioLogado");
    if (!userLocal) {
      alert("Usuário não autenticado!");
      navigate("/login");
      return;
    }

    const user = JSON.parse(userLocal);
    setUsuario(user);
  }, [navigate]);

  if (!usuario) {
    return null; // ou um loading
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Meu Perfil</h2>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-1">Nome</label>
          <div className="border border-gray-200 rounded px-4 py-2 bg-gray-50">
            {usuario.nome}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-1">Email</label>
          <div className="border border-gray-200 rounded px-4 py-2 bg-gray-50">
            {usuario.email}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-1">Tipo de usuário</label>
          <span
            className={`inline-block px-3 py-1 text-sm rounded-full ${
              usuario.role === "admin"
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            {usuario.role === "admin" ? "Administrador" : "Comum"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
