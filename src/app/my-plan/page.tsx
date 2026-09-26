'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePlan } from '@/context/planContext';

export default function MyPlanPage() {
  const { todayPlan, savedPlan, removeFromTodayPlan, removeFromSavedPlan } = usePlan();

  const [activeTab, setActiveTab] = useState<'today' | 'saved'>('today');
  const [sortBy, setSortBy] = useState<'duration' | 'calories' | 'rating'>('duration');
  const [isLoading, setIsLoading] = useState(true);
  const [completedIds, setCompletedIds] = useState<(string | number)[]>([]);

  // Simulate loading state on initial load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Determine active list based on selected tab
  const currentList = activeTab === 'today' ? todayPlan : savedPlan;

  // Robust helper to extract numerical calories from any format (string ranges, numbers, alternate keys)
  const extractCalories = (item: any): number => {
    const val = item?.calories ?? item?.calorie ?? item?.caloriesBurned;
    if (typeof val === 'number') return val;
    if (typeof val === 'string') {
      const match = val.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    }
    return 0;
  };

  // Robust helper to extract duration minutes
  const extractDuration = (item: any): number => {
    const val = item?.duration ?? item?.time;
    if (typeof val === 'number') return val;
    if (typeof val === 'string') {
      const match = val.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    }
    return 0;
  };

  // Robust helper to extract decimal ratings
  const extractRating = (item: any): number => {
    const val = item?.rating;
    if (typeof val === 'number') return val;
    if (typeof val === 'string') {
      const match = val.match(/\d+(\.\d+)?/);
      return match ? parseFloat(match[0]) : 0;
    }
    return 0;
  };

  // Dynamic Summary Row Metrics (Updates based on activeTab)
  const totalExercises = currentList.length;

  const totalMinutes = useMemo(() => {
    return currentList.reduce((acc, item) => acc + extractDuration(item), 0);
  }, [currentList]);

  const totalCalories = useMemo(() => {
    return currentList.reduce((acc, item) => acc + extractCalories(item), 0);
  }, [currentList]);

  // Re-sort current list
  const sortedList = useMemo(() => {
    return [...currentList].sort((a, b) => {
      if (sortBy === 'duration') {
        return extractDuration(b) - extractDuration(a);
      }
      if (sortBy === 'calories') {
        return extractCalories(b) - extractCalories(a);
      }
      if (sortBy === 'rating') {
        return extractRating(b) - extractRating(a);
      }
      return 0;
    });
  }, [currentList, sortBy]);

  const toggleComplete = (id: string | number) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRemove = (id: string | number) => {
    if (activeTab === 'today') {
      removeFromTodayPlan(id);
    } else {
      removeFromSavedPlan(id);
    }
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10 text-white">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight">MY PLAN</h1>
        <p className="mt-2 text-zinc-400">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary Row (Changes dynamically for Today's Plan vs Saved) */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            {activeTab === 'today' ? "Today's Exercises" : 'Saved Exercises'}
          </p>
          <p className="mt-2 text-3xl font-extrabold text-lime-400">
            {totalExercises}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Total Minutes
          </p>
          <p className="mt-2 text-3xl font-extrabold text-lime-400">
            {totalMinutes} <span className="text-sm font-normal text-zinc-400">min</span>
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Total Calories
          </p>
          <p className="mt-2 text-3xl font-extrabold text-lime-400">
            {totalCalories} <span className="text-sm font-normal text-zinc-400">kcal</span>
          </p>
        </div>
      </div>

      {/* Tabs & Sort Controls */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-2">
        {/* Left Option Group: Todays plan / Saved */}
        <div className="flex items-center gap-1 rounded-xl bg-zinc-950 p-1 border border-zinc-800">
          <button
            onClick={() => setActiveTab('today')}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === 'today'
                ? 'bg-lime-400 text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Today's Plan ({todayPlan.length})
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === 'saved'
                ? 'bg-lime-400 text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Saved ({savedPlan.length})
          </button>
        </div>

        {/* Right Option Group: Sort By Dropdown */}
        <div className="flex items-center gap-2 pr-2">
          <span className="text-xs font-medium text-zinc-400">Sort By</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none rounded-xl border border-zinc-800 bg-zinc-950 py-2 pl-3 pr-8 text-xs font-semibold text-zinc-200 outline-none focus:border-lime-400"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <svg
              className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Main List Section */}
      <div className="mt-6">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-zinc-800">
            <p className="animate-pulse text-zinc-400">Loading workouts…</p>
          </div>
        ) : sortedList.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/30 px-6 py-16 text-center">
            <h2 className="text-xl font-bold tracking-wide text-zinc-200">NOTHING HERE YET</h2>
            <p className="mt-2 max-w-sm text-sm text-zinc-400">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-xl bg-lime-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-lime-300"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          /* Workout Cards List */
          <div className="flex flex-col gap-4">
            {sortedList.map((workout) => {
              const isDone = completedIds.includes(workout.id);
              
              const equipmentList = Array.isArray(workout.equipment)
                ? workout.equipment.join(', ')
                : workout.equipment || 'Bodyweight';

              const calVal = extractCalories(workout);
              const durVal = workout.duration || (extractDuration(workout) ? `${extractDuration(workout)} min` : 'N/A');
              const rateVal = extractRating(workout) || 'N/A';

              return (
                <div
                  key={workout.id}
                  className={`flex flex-col items-start justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition-all md:flex-row md:items-center ${
                    isDone && activeTab === 'today' ? 'opacity-60 border-zinc-800/50' : ''
                  }`}
                >
                  {/* Left Section: Thumbnail & Workout Details */}
                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-800">
                      {workout.image ? (
                        <Image
                          src={workout.image}
                          alt={workout.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-zinc-500">
                          No Image
                        </div>
                      )}
                    </div>

                    <div>
                      <h3
                        className={`text-lg font-bold ${
                          isDone && activeTab === 'today' ? 'line-through text-zinc-400' : 'text-white'
                        }`}
                      >
                        {workout.name}
                      </h3>
                      <p className="mt-0.5 text-xs font-medium text-lime-400">
                        {equipmentList}
                      </p>

                      {/* Stats Row with Duration, Calories, and Rating */}
                      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                        <span className="flex items-center gap-1">
                          ⏱️ {durVal}
                        </span>
                        <span className="flex items-center gap-1">
                          🔥 {calVal > 0 ? `${calVal} kcal` : 'N/A'}
                        </span>
                        <span className="flex items-center gap-1">
                          ⭐ {rateVal}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Section: Actions */}
                  <div className="flex w-full items-center justify-between gap-3 border-t border-zinc-800/80 pt-3 md:w-auto md:justify-end md:border-none md:pt-0">
                    <Link
                      href={`/workouts/${workout.id}`}
                      className="rounded-xl border border-zinc-700 bg-zinc-800 px-3.5 py-2 text-xs font-semibold text-zinc-200 transition hover:bg-zinc-700 hover:text-white"
                    >
                      View Details
                    </Link>

                    {/* Mark as Done (Only visible in Today's Plan tab) */}
                    {activeTab === 'today' && (
                      <button
                        onClick={() => toggleComplete(workout.id)}
                        className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                          isDone
                            ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                            : 'bg-lime-400/10 text-lime-400 border border-lime-400/30 hover:bg-lime-400 hover:text-black'
                        }`}
                      >
                        {isDone ? 'Done ✓' : 'Mark as Done'}
                      </button>
                    )}

                    {/* Remove Cross Button */}
                    <button
                      onClick={() => handleRemove(workout.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-xl text-zinc-500 transition hover:bg-zinc-800 hover:text-red-400"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}