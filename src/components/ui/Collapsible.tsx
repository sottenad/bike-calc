'use client';

import { ReactNode } from 'react';

interface CollapsibleProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function Collapsible({ title, children, defaultOpen = false }: CollapsibleProps) {
  return (
    <section className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 mb-6 transition-colors">
      <details className="group" open={defaultOpen}>
        <summary className="p-6 flex items-center justify-between cursor-pointer list-none">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
          <svg
            className="w-5 h-5 text-gray-500 dark:text-slate-400 transition-transform group-open:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </summary>
        <div className="px-6 pb-6 border-t border-gray-100 dark:border-slate-700 pt-4">
          {children}
        </div>
      </details>
    </section>
  );
}

// Small collapsible for inline explanations
interface SmallCollapsibleProps {
  title: string;
  children: ReactNode;
}

export function SmallCollapsible({ title, children }: SmallCollapsibleProps) {
  return (
    <details className="mt-6 group">
      <summary className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400 cursor-pointer list-none">
        <svg
          className="w-4 h-4 transition-transform group-open:rotate-90"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
        {title}
      </summary>
      <div className="mt-2 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg text-sm text-gray-600 dark:text-slate-300">
        {children}
      </div>
    </details>
  );
}
