import { get, post, patch, del, API_BASE } from './api';

export interface Nota {
    id: number;
    numeroRota: number;
    numeroNota: number;
    tipologia: string | null;
    conferidoPor: string | null;
    avaria: string | null;
}

export function fetchNotas(dia: string, rota?: string): Promise<Nota[]> {
    const rotaParam = rota ? `&rota=${rota}` : '';
    return get<Nota[]>(`/notas?dia=${dia}${rotaParam}`);
}


export function updateNota(id: number, data: any) {
    return patch(`/notas/${id}`, data);
}

export function deleteNota(id: number) {
    return del(`/notas/${id}`);
}

export async function fetchNotaFoto(id: number): Promise<string> {
    const res = await fetch(`${API_BASE}/notas/${id}/foto`);
    if (!res.ok) throw new Error('Erro ao buscar foto');
    
    const blob = await res.blob();
    return URL.createObjectURL(blob);
}
