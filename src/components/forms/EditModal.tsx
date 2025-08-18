import { ReactNode } from "react";

type EditModalProps = {
  title: string;
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  saving?: boolean;
  children: ReactNode;
};

export default function EditModal({
  title,
  open,
  onClose,
  onSave,
  saving,
  children,
}: EditModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      {/* card */}
      <div className="relative z-10 w-[95%] max-w-xl bg-white rounded-2xl shadow-xl">
        <div className="px-5 py-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <div className="px-5 py-4">{children}</div>
        <div className="px-5 py-4 border-t flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            disabled={saving}
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
            disabled={saving}
          >
            {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}
