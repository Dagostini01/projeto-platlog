interface ContadoresResumoProps {
  clientes: number;
  projetos: number;
  ordens: number;
}

function ContadoresResumo({ clientes, projetos, ordens }: ContadoresResumoProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 p-4">
      <div className="bg-blue-100 p-4 rounded shadow">
        <p className="text-sm text-gray-600">Clientes</p>
        <p className="text-2xl font-bold">{clientes}</p>
      </div>
      <div className="bg-green-100 p-4 rounded shadow">
        <p className="text-sm text-gray-600">Projetos</p>
        <p className="text-2xl font-bold">{projetos}</p>
      </div>
      <div className="bg-purple-100 p-4 rounded shadow">
        <p className="text-sm text-gray-600">Ordens de Serviço</p>
        <p className="text-2xl font-bold">{ordens}</p>
      </div>
    </div>
  );
}

export default ContadoresResumo;
