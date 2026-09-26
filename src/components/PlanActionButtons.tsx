'use client';

import React from 'react';
import { usePlan } from '@/context/planContext';

export default function PlanActionButtons({ workout }: { workout: any }) {
  const { addToTodayPlan, saveForLater } = usePlan();

  return (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      {/* Add to today's plan */}
      <button
        type="button"
        onClick={() => addToTodayPlan(workout)}
        className="flex items-center gap-2 rounded-xl bg-lime-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-lime-300 active:scale-95"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        Add to today's plan
      </button>

      {/* Save for later */}
      <button
        type="button"
        onClick={() => saveForLater(workout)}
        className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-[#12151c] px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:bg-zinc-800/80 hover:text-white active:scale-95"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
        Save for later
      </button>
    </div>
  );
}