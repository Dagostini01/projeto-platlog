import { Cliente, Projeto, OrdemServico } from "../types";

export const mockClientes: Cliente[] = [
  {
    id: "1",
    nome: "Acme Corp",
    email: "contato@acme.com",
    telefone: "(11) 1234-5678",
    projetos: [
      {
        id: "p1",
        nome: "Sistema Interno",
        clienteId: "1",
        descricao: "Sistema interno de gestão",
        ordensServico: [
          {
            id: "os1",
            descricao: "Instalação de servidor",
            status: "concluída",
            projetoId: "p1",
          },
          {
            id: "os2",
            descricao: "Treinamento da equipe",
            status: "em andamento",
            projetoId: "p1",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    nome: "Beta Solutions",
    email: "beta@empresa.com",
    telefone: "(21) 9999-8888",
    projetos: [
      {
        id: "p2",
        nome: "Website Institucional",
        clienteId: "2",
        ordensServico: [
          {
            id: "os3",
            descricao: "Revisão de layout",
            status: "aberta",
            projetoId: "p2",
          },
        ],
      },
    ],
  },
];
