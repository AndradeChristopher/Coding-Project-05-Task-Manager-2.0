'use client';

export default function TaskStats({
  total,
  active,
  done,
  onClearCompleted,
}: {
  total: number;
  active: number;
  done: number;
  onClearCompleted: () => void;
}) {
  const canClear = done > 0;

  return (
    <div className="mt-4 flex items-center justify-between gap-3">
      <div className="text-xs text-slate-400">
        <span className="mr-3">
          Total: <span className="text-slate-200">{total}</span>
        </span>
        <span className="mr-3">
          Active: <span className="text-slate-200">{active}</span>
        </span>
        <span>
          Done: <span className="text-slate-200">{done}</span>
        </span>
      </div>

      <button
        type="button"
        onClick={onClearCompleted}
        disabled={!canClear}
        className={`rounded-lg border px-3 py-2 text-xs transition-colors ${
          canClear
            ? 'border-slate-800 bg-slate-900/40 text-slate-200 hover:bg-slate-800/60'
            : 'border-slate-900 text-slate-600 cursor-not-allowed'
        }`}>
        Clear completed
      </button>
    </div>
  );
}
