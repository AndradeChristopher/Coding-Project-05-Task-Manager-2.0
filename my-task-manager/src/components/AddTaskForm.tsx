'use client';

import { useState } from 'react';

export default function AddTaskForm({
  onAdd,
}: {
  onAdd: (title: string) => void;
}) {
  const [title, setTitle] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const trimmed = title.trim();
        if (!trimmed) return;
        onAdd(trimmed);
        setTitle('');
      }}
      className="flex gap-2">
        
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a task..."
        className="flex-1 rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2 text-slate-100 placeholder:text-slate-600 outline-none focus:border-teal-500/60"
        aria-label="Task title"/>
      <button
        type="submit"
        className="rounded-lg bg-teal-500/20 px-3 py-2 text-sm text-teal-200 hover:bg-teal-500/30 border border-teal-500/30">
        Add
      </button>
    </form>
  );
}
