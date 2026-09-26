'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { usePlan } from '@/context/planContext';

const Navbar = () => {
    const { todayPlan, savedPlan } = usePlan();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">

                {/* SECTION 1: Logo + Name */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2 font-bold text-white hover:opacity-90">
                        <Image src="/assets/logo.png" alt="FITLOG Logo" width={36} height={36} />
                        <span className="text-xl tracking-wider">FITLOG</span>
                    </Link>
                </div>

                {/* SECTION 2: Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-6">
                    <Link
                        href="/"
                        className="text-sm font-semibold text-zinc-300 transition-all duration-200 py-1 px-3 hover:rounded-full hover:bg-[#091e02] hover:text-lime-400"
                    >
                        Workouts
                    </Link>

                    <Link
                        href="/my-plan"
                        className="text-sm font-semibold text-zinc-300 transition-all duration-200 py-1 px-3 hover:rounded-full hover:bg-[#091e02] hover:text-lime-400"
                    >
                        My Plan
                    </Link>
                </div>

                {/* SECTION 3: Plan & Saved Badges + Mobile Hamburger Button */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Plan Badge */}
                    <Link
                        href="/"
                        className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 text-xs font-semibold text-zinc-200 transition-colors hover:text-lime-400"
                    >
                        <span>Plan</span>
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lime-400 text-xs font-bold text-black">
                            {todayPlan?.length || 0}
                        </span>
                    </Link>

                    {/* Saved Badge */}
                    <Link
                        href="/"
                        className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 text-xs font-semibold text-zinc-200 transition-colors hover:text-white"
                    >
                        <span>Saved</span>
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-700 text-xs font-bold text-white">
                            {savedPlan?.length || 0}
                        </span>
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        type="button"
                        className="inline-flex items-center justify-center p-2 text-zinc-400 hover:text-white focus:outline-none md:hidden"
                        aria-controls="mobile-menu"
                        aria-expanded={isOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        {isOpen ? (
                            // Close Icon (X)
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            // Hamburger Icon
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden border-t border-zinc-800 bg-zinc-950 px-4 pt-3 pb-4 space-y-2" id="mobile-menu">
                    <Link
                        href="/"
                        onClick={() => setIsOpen(false)}
                        className="block rounded-lg px-3 py-2 text-base font-semibold text-zinc-300 hover:bg-[#091e02] hover:text-lime-400 transition-colors"
                    >
                        Workouts
                    </Link>

                    <Link
                        href="/my-plan"
                        onClick={() => setIsOpen(false)}
                        className="block rounded-lg px-3 py-2 text-base font-semibold text-zinc-300 hover:bg-[#091e02] hover:text-lime-400 transition-colors"
                    >
                        My Plan
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;