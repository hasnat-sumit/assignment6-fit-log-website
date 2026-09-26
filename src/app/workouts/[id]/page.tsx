import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import PlanActionButtons from '@/components/PlanActionButtons';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

type Card = {
  id: string | number;
  name: string;
  image?: string;
  muscleGroups?: string[];
  rating?: number;
  duration?: string;
  description?: string;
  instructions?: string[] | string;
  equipment?: string[] | string;
  difficulty?: string;
  sets?: number | string;
  reps?: number | string;
  calories?: number | string;
};

// 1. Fetch function with try/catch network timeout protection
async function getWorkouts(): Promise<Card[]> {
  try {
    const res = await fetch('https://api.abcz.workers.dev/api/fitlog', {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) return [];

    const data = await res.json();
    return Array.isArray(data) ? data : data?.data || [];
  } catch (error) {
    console.error('Failed to fetch workouts:', error);
    return [];
  }
}

// 2. generateStaticParams runs at build time to create static HTML pages
export async function generateStaticParams() {
  const workouts = await getWorkouts();

  return workouts.map((workout) => ({
    id: String(workout.id),
  }));
}

// 3. Page component receives pre-rendered static params
export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workouts = await getWorkouts();

  const workout = workouts.find((item) => String(item.id) === String(id));

  if (!workout) {
    notFound();
  }

  return (
    // Single inter.className applied at root wrapper so all subcomponents & text inherit Inter
    <div className={`${inter.className} container mx-auto px-4 py-10`}>
      <Link
        href="/"
        className="mb-6 inline-block text-sm text-gray-400 hover:text-white"
      >
        &larr; Back to Library
      </Link>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Left Column: Image */}
        <figure className="relative aspect-square w-full overflow-hidden rounded-2xl md:aspect-auto md:h-full">
          {workout.image && (
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          )}
        </figure>

        {/* Right Column: Workout Info & Actions */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-white">
          <h1 className="text-3xl font-bold text-white">{workout.name}</h1>

          {workout.description && (
            <p className="mt-4 text-[15px] text-gray-300">{workout.description}</p>
          )}

          <div className="my-4 flex flex-wrap gap-2">
            {workout.muscleGroups?.map((group, index) => (
              <span
                key={index}
                className="rounded-full bg-lime-400 px-3 py-1 text-xs font-semibold text-black"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Specs Table */}
          {(() => {
            const specItems = [
              {
                label: 'EQUIPMENT',
                value: Array.isArray(workout.equipment)
                  ? workout.equipment.join(', ')
                  : workout.equipment,
              },
              { label: 'DIFFICULTY', value: workout.difficulty },
              { label: 'SETS', value: workout.sets },
              { label: 'REPS', value: workout.reps },
              { label: 'DURATION', value: workout.duration },
              {
                label: 'CALORIES',
                value: workout.calories ? `${workout.calories} kcal` : undefined,
              },
              { label: 'RATING', value: workout.rating },
            ].filter(
              (item) =>
                item.value !== undefined &&
                item.value !== null &&
                item.value !== ''
            );

            if (specItems.length === 0) return null;

            return (
              <div className="my-4 w-full rounded-2xl border border-zinc-800 bg-[#12151c] px-6 py-2 text-zinc-300 shadow-xl">
                <div className="divide-y divide-zinc-800/60">
                  {specItems.map((spec, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 text-[12px]"
                    >
                      <span className="text-[12px] font-semibold uppercase tracking-wider text-zinc-400">
                        {spec.label}
                      </span>
                      <span className="font-medium text-zinc-400">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Instructions */}
          {workout.instructions && Array.isArray(workout.instructions) ? (
            <div className="mt-6">
              <h2 className="mb-2 text-lg font-semibold text-white">
                INSTRUCTIONS
              </h2>
              <ol className="list-inside list-decimal space-y-2 text-[12px] text-gray-300">
                {workout.instructions.map((step, index) => (
                  <li key={index} className="leading-relaxed">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            workout.instructions && (
              <p className="mt-2 text-gray-300">{workout.instructions}</p>
            )
          )}

          {/* Interactive Client Component Buttons */}
          <PlanActionButtons workout={workout} />
        </div>
      </div>
    </div>
  );
}