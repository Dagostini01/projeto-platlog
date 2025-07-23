import { Link, Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Menu lateral */}
      <aside className="w-64 bg-blue-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-6">Sistema</h1>
        <nav className="flex flex-col space-y-3">
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/clientes" className="hover:underline">Clientes</Link>
          <Link to="/projetos" className="hover:underline">Projetos</Link>
          <Link to="/ordens-servico" className="hover:underline">Ordens de Serviço</Link>
          <Link to="/login" className="hover:underline text-sm mt-6 text-blue-200">Sair</Link>
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
