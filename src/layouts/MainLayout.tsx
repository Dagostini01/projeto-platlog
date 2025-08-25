import { Link, Outlet, useNavigate } from "react-router-dom";

function MainLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Menu lateral */}
      <aside className="w-64 bg-blue-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-6">Sistema</h1>
        <nav className="flex flex-col space-y-3">
          <Link to="/perfil" className="hover:underline">Perfil</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/cadastro" className="hover:underline">Cadastro</Link>
          <button onClick={handleLogout} className="text-left hover:underline text-sm mt-6 text-blue-200">
            Sair
          </button>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
