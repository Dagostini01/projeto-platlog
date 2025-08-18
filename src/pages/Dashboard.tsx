import { useEffect, useState } from "react";
import { mockClientes } from "../services/mock";
import ResumoDoDia from "../components/ResumoDoDia";
import UploadExcelCard from "../components/UploadExcelCard";

function Dashboard() {
  const [usuario, setUsuario] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("usuarioLogado");
    if (userStr) {
      setUsuario(JSON.parse(userStr));
    }
  }, []);

  const clientes = mockClientes;

  return (
    <div className="p-4">
      {/* Barra superior de saudação */}
      {usuario && (
        <div className="bg-blue-100 border border-blue-300 text-blue-800 px-4 py-2 rounded mb-4">
          Olá, <strong>{usuario.nome}</strong>! Seja bem-vindo.
        </div>
      )}
      <ResumoDoDia />
      <UploadExcelCard />
    </div>
  );
}

export default Dashboard;
