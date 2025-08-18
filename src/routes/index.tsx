import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import { RotaPrivada } from "./RotaPrivada";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import Perfil from "../pages/Perfil";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ROTAS PÚBLICAS */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* ROTAS PROTEGIDAS COM LAYOUT */}
        <Route
          path="/"
          element={
            <RotaPrivada>
              <MainLayout />
            </RotaPrivada>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="perfil" element={<Perfil />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
