interface Projeto {
  nome: string;
  cliente: string;
  totalOS: number;
  ultimoStatus: string;
}

interface Props {
  projetos: Projeto[];
}

function TabelaUltimosProjetos({ projetos }: Props) {
  return (
    <div className="bg-white p-4 rounded shadow overflow-x-auto mb-6">
      <h2 className="text-lg font-semibold mb-4">Últimos Projetos Criados</h2>
      <table className="min-w-full text-sm">
        <thead className="border-b">
          <tr>
            <th className="text-left p-2">Projeto</th>
            <th className="text-left p-2">Cliente</th>
            <th className="text-left p-2">OSs Criadas</th>
            <th className="text-left p-2">Status do Último OS</th>
          </tr>
        </thead>
        <tbody>
          {projetos.map((p, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-2">{p.nome}</td>
              <td className="p-2">{p.cliente}</td>
              <td className="p-2">{p.totalOS}</td>
              <td className="p-2 capitalize">{p.ultimoStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TabelaUltimosProjetos;
