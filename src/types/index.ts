export type Usuario = {
  id: string;
  nome: string;
  email: string;
  role: "admin" | "user";
};

export type Cliente = {
  id: string;
  nome: string;
  email?: string;
  telefone?: string;
  projetos: Projeto[];
};

export type Projeto = {
  id: string;
  nome: string;
  descricao?: string;
  clienteId: string;
  ordensServico: OrdemServico[];
};

export type OrdemServico = {
  id: string;
  descricao: string;
  status: "aberta" | "em andamento" | "concluída";
  projetoId: string;
};
