'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { usePlan } from '@/context/planContext';

const Navbar = () => {
    const { todayPlan, savedPlan } = usePlan();

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-zinc-800 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-6">

                {/* SECTION 1: Logo + Name */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2 font-bold text-white hover:opacity-90">
                        <Image src="/assets/logo.png" alt="FITLOG Logo" width={36} height={36} />
                        <span className="text-xl tracking-wider">FITLOG</span>
                    </Link>
                </div>

                {/* SECTION 2: Workouts, My Plan (Clicking Workouts goes to Homepage) */}
                <div className="flex items-center gap-6">
                    <Link
                        href="/"
                        className="text-sm font-semibold text-zinc-300 transition-colors hover:text-lime-400 hover:rounded-4xl hover:bg-lime-900"
                    >
                        Workouts
                    </Link>

                    <Link
                        href="/my-plan"
                        className="text-sm font-semibold text-zinc-300 transition-colors hover:text-lime-400"
                    >
                        My Plan
                    </Link>
                </div>

                {/* SECTION 3: Plan, Saved (Clicking takes to Homepage, No Borders) */}
                <div className="flex items-center gap-3">
                    {/* Plan Badge */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-zinc-200 transition-colors "
                    >
                        <span>Plan</span>
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lime-400 text-xs font-bold text-black">
                            {todayPlan.length}
                        </span>
                    </Link>

                    {/* Saved Badge */}
                    <Link
                        href="/"
                        className="flex items-center gap-2  px-3 py-1.5 text-xs font-semibold text-zinc-200 transition-colors"
                    >
                        <span>Saved</span>
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-700 text-xs font-bold text-white">
                            {savedPlan.length}
                        </span>
                    </Link>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;