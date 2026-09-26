import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const Footer = () => {
    return (
        <footer className="w-full">
            {/* Divider */}
            <hr className="border-t border-gray-800/40 w-full my-0 mb-8 sm:mb-10" />

            {/* Main Container */}
            <div className="container mx-auto px-4 sm:px-6 my-8 sm:my-10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">

                {/* SECTION 1: Logo + Name */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2 font-bold text-white hover:opacity-90 transition-opacity">
                        <Image src="/assets/logo.png" alt="FITLOG Logo" width={36} height={36} />
                        <span className="text-xl tracking-wider">FITLOG</span>
                    </Link>
                </div>

                {/* SECTION 2: Copyright Text */}
                <div className={`${inter.className} text-gray-500 text-center sm:text-right font-light text-xs sm:text-[12px]`}>
                    © 2026 FitLog — Workout Library. Train hard, log honest.
                </div>

            </div>
        </footer>
    );
};

export default Footer;