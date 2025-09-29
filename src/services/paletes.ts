import { get, post, patch, del, API_BASE } from './api';

export interface Palete {
  id: number;
  numeroRota: number;
  numeroPallet: string;
  tipologia: string | null;
  remontado: string;
  conferido: string;
}

export function fetchPaletes(dia: string, rota?: string): Promise<Palete[]> {
  const rotaParam = rota ? `&rota=${rota}` : '';
  return get<Palete[]>(`/paletes?dia=${dia}${rotaParam}`);
}


export function updatePalete(id: number, data: any) {
  return patch(`/paletes/${id}`, data);
}

export function deletePalete(id: number) {
  return del(`/paletes/${id}`);
}

export async function fetchPaleteFoto(id: number): Promise<string> {
  const res = await fetch(`${API_BASE}/paletes/${id}/foto`);
  if (!res.ok) throw new Error('Erro ao buscar foto');
  
  const blob = await res.blob();
  return URL.createObjectURL(blob);
}
