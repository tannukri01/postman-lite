'use client';

import { useRequestStore } from '@/store/useRequestStore';
import { HttpMethod } from '@/types';
import { cn } from '@/lib/utils';

const methods: HttpMethod[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

const methodStyles: Record<HttpMethod, string> = {
  GET: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
  POST: 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800',
  PUT: 'bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800',
  DELETE: 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
  PATCH: 'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800',
  HEAD: 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800/50 dark:text-gray-400 border-gray-200 dark:border-gray-700',
  OPTIONS: 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800/50 dark:text-gray-400 border-gray-200 dark:border-gray-700',
};

export function MethodSelector() {
  const { currentRequest, setMethod } = useRequestStore();

  return (
    <div className="relative">
      <select
        value={currentRequest.method}
        onChange={(e) => setMethod(e.target.value as HttpMethod)}
        className={cn(
          'appearance-none px-3 py-2 pr-8 rounded-lg text-sm font-bold border cursor-pointer transition-all outline-none focus:ring-2 focus:ring-primary/20',
          methodStyles[currentRequest.method]
        )}
      >
        {methods.map((method) => (
          <option key={method} value={method}>
            {method}
          </option>
        ))}
      </select>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}
