import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Clientes from "../pages/Clientes";
import Projetos from "../pages/Projetos";
import OrdensServico from "../pages/OrdensServico";
import MainLayout from "../layouts/MainLayout";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/projetos" element={<Projetos />} />
        <Route path="/ordens-servico" element={<OrdensServico />} />
      </Route>

      <Route path="*" element={<div className="p-4">Página não encontrada</div>} />
    </Routes>
  );
}

export default AppRoutes;
