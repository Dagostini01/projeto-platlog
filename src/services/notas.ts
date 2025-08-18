import { get, post, patch, del } from './api';

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
