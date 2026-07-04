'use client';

export default function TaskCard({
  id,
  title,
  done,
  onToggle,
  onDelete,
}: {
  id: string;
  title: string;
  done: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <li className="flex items-center justify-between gap-3 border-b border-slate-800 py-3">
      <span className={`text-sm ${done ? 'text-slate-500 line-through' : 'text-slate-100'}`}>
        {title}
      </span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onToggle(id)}
          className={`rounded-md px-2.5 py-1 text-xs border transition-colors ${
            done
              ? 'bg-emerald-500/10 border-emerald-400/20 text-emerald-200'
              : 'bg-slate-800/40 border-slate-700 text-slate-200 hover:bg-slate-800/60'}`}>{done ? 'Done' : 'Mark done'}
        </button>

        <button
          type="button"
          onClick={() => onDelete(id)}
          className="rounded-md px-2.5 py-1 text-xs border border-rose-500/20 text-rose-200 hover:bg-rose-500/10 transition-colors">
          Delete
        </button>
      </div>
    </li>
  );
}
