import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Aqui você faria autenticação real e definiria a role
    alert(`Login simulado como ${email}`);
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          className="border p-2 w-full mb-4"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;
