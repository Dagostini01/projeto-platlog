interface Props {
  contarStatus: (status: string) => number;
}

function StatusOSCards({ contarStatus }: Props) {
  return (
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
  );
}

export default StatusOSCards;
