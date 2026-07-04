'use client';

import { useEffect, useMemo, useState } from 'react';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';
import TaskStats from './TaskStats';

type Task = { id: string; title: string; done: boolean };

const FILTERS = { all: 'all', active: 'active', done: 'done' } as const;
type Filter = (typeof FILTERS)[keyof typeof FILTERS];

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>(FILTERS.all);

// Mount
  useEffect(() => {
    const raw = localStorage.getItem('tasks');
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setTasks(parsed);
    } catch {}
  }, []);

// Save
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const stats = useMemo(() => {
    const done = tasks.filter((t) => t.done).length;
    return { total: tasks.length, done, active: tasks.length - done };
  }, [tasks]);

  const visibleTasks = useMemo(() => {
    if (filter === FILTERS.done) return tasks.filter((t) => t.done);
    if (filter === FILTERS.active) return tasks.filter((t) => !t.done);
    return tasks;
  }, [tasks, filter]);

  const showEmpty = tasks.length === 0;

  return (
    <section className="mx-auto w-full max-w-xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Task Manager</h1>
        <p className="mt-1 text-sm text-slate-400">Saved on refresh.</p>
      </header>

      <div className="rounded-xl border border-slate-800 bg-slate-900/40">
        <div className="p-5">
          <AddTaskForm
            onAdd={(title) =>
              setTasks((prev) => [
                ...prev,
                { id: crypto.randomUUID(), title, done: false },
              ])
            }/>

          {tasks.length > 0 && (
            <div className="mt-4 flex rounded-lg border border-slate-800 bg-slate-950/40 p-1">
              <FilterButton
                label="All"
                active={filter === FILTERS.all}
                onClick={() => setFilter(FILTERS.all)}/>
              <FilterButton
                label="Active"
                active={filter === FILTERS.active}
                onClick={() => setFilter(FILTERS.active)}/>
              <FilterButton
                label="Done"
                active={filter === FILTERS.done}
                onClick={() => setFilter(FILTERS.done)}/>
            </div>
          )}

          <TaskStats
            total={stats.total}
            active={stats.active}
            done={stats.done}
            onClearCompleted={() =>
              setTasks((prev) => prev.filter((t) => !t.done))
            }/>

          <TaskList
            tasks={visibleTasks}
            onToggle={(id) =>
              setTasks((prev) =>
                prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
              )
            }
            onDelete={(id) => setTasks((prev) => prev.filter((t) => t.id !== id))}
            showEmpty={showEmpty}/>
        </div>
      </div>
    </section>
  );
}

// Controls for FilterButton 

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 px-3 py-2 text-center text-sm rounded-md transition-colors ${
        active
          ? 'bg-teal-500/20 text-teal-200'
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
      }`}>
      {label}
    </button>
  );
}
