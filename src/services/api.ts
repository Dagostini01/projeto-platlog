export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

export async function get<T>(url: string) {
  const res = await fetch(`${API_BASE}${url}`);
  if (!res.ok) throw new Error('Erro ao buscar dados');
  return res.json() as Promise<T>;
}

export async function post<T>(url: string, data: any) {
  const res = await fetch(`${API_BASE}${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erro ao criar');
  return res.json() as Promise<T>;
}

export async function patch<T>(url: string, data: any) {
  const res = await fetch(`${API_BASE}${url}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erro ao atualizar');
  return res.json() as Promise<T>;
}

export async function del<T>(url: string) {
  const res = await fetch(`${API_BASE}${url}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Erro ao deletar');
  return res.json() as Promise<T>;
}


//USER
export async function cadastrarUsuario(data: {
  nome: string;
  email: string;
  senha: string;
  role?: "admin" | "comum" | undefined;
}) {
  const res = await fetch(`${API_BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Erro ao cadastrar usuário");
  }

  return res.json();
}

export async function buscarUsuarios() {
  const res = await fetch(`${API_BASE}/users`);
  if (!res.ok) {
    throw new Error("Erro ao buscar usuários");
  }
  return res.json();
}
