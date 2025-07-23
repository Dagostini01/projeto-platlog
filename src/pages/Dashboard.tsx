import { mockClientes } from "../services/mock";

function Dashboard() {
  const clientes = mockClientes;

  const projetos = clientes.flatMap((cliente) =>
    cliente.projetos.map((projeto) => ({
      ...projeto,
      clienteNome: cliente.nome,
    }))
  );

  const ordens = projetos.flatMap((projeto) =>
    projeto.ordensServico.map((os) => ({
      ...os,
      projetoNome: projeto.nome,
      clienteNome: projeto.clienteNome,
    }))
  );

  const contarStatus = (status: string) =>
    ordens.filter((os) => os.status === status).length;

  const ultimosProjetos = projetos
    .slice(-5)
    .reverse()
    .map((projeto) => {
      const totalOS = projeto.ordensServico.length;
      const ultimoStatus =
        totalOS > 0
          ? projeto.ordensServico[0].status
          : "sem OS";

      return {
        nome: projeto.nome,
        cliente: projeto.clienteNome,
        totalOS,
        ultimoStatus,
      };
    });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Painel de Controle</h1>

      {/* Contadores */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded shadow">
          <p className="text-sm text-gray-600">Clientes</p>
          <p className="text-2xl font-bold">{clientes.length}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <p className="text-sm text-gray-600">Projetos</p>
          <p className="text-2xl font-bold">{projetos.length}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded shadow">
          <p className="text-sm text-gray-600">Ordens de Serviço</p>
          <p className="text-2xl font-bold">{ordens.length}</p>
        </div>
      </div>

      {/* Status das OS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-yellow-100 p-4 rounded shadow">
          <p className="text-sm text-gray-600">OSs Abertas</p>
          <p className="text-xl font-bold">{contarStatus("aberta")}</p>
        </div>
        <div className="bg-orange-100 p-4 rounded shadow">
          <p className="text-sm text-gray-600">Em Andamento</p>
          <p className="text-xl font-bold">{contarStatus("em andamento")}</p>
        </div>
        <div className="bg-green-200 p-4 rounded shadow">
          <p className="text-sm text-gray-600">Concluídas</p>
          <p className="text-xl font-bold">{contarStatus("concluída")}</p>
        </div>
      </div>

      {/* Tabela de últimos projetos */}
      <div className="bg-white p-4 rounded shadow overflow-x-auto">
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
            {ultimosProjetos.map((p, index) => (
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
    </div>
  );
}

export default Dashboard;
