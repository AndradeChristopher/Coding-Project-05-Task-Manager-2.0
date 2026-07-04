'use client';

import TaskCard from './TaskCard';

// No tasks at all or no matches in a filter selection (in Active/Done).

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  showEmpty,
}: {
  tasks: { id: string; title: string; done: boolean }[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  showEmpty: boolean;
}) {
  if (showEmpty) {
    return (
      <div className="mt-5 rounded-lg border border-slate-800 bg-slate-950/30 p-4 text-sm text-slate-400">
        No tasks yet. Add your first one above.
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <ul className="mt-4">
        <li className="rounded-lg border border-slate-800 bg-slate-950/30 p-4 text-sm text-slate-400">
          No tasks match this filter.
        </li>
      </ul>
    );
  }

  return (
    <ul className="mt-4">
      {tasks.map((t) => (
        <TaskCard
          key={t.id}
          id={t.id}
          title={t.title}
          done={t.done}
          onToggle={onToggle}
          onDelete={onDelete}/>
      ))}
    </ul>
  );
}
