import { Navigate } from "react-router-dom";

interface RotaPrivadaProps {
  children: JSX.Element;
}

export function RotaPrivada({ children }: RotaPrivadaProps) {
  const usuarioLogado = localStorage.getItem("usuarioLogado");

  if (!usuarioLogado) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
