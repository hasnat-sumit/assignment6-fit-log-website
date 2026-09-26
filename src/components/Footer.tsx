import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });


const Footer = () => {
    return (

        <div className=''>
            <hr className="border-t border-gray-800/40 w-full my-0 mb-10" />
            <div className='flex justify-between container mx-auto mt-10 mb-10 '>

                {/* SECTION 1: Logo + Name */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2 font-bold text-white hover:opacity-90">
                        <Image src="/assets/logo.png" alt="FITLOG Logo" width={36} height={36} />
                        <span className="text-xl tracking-wider">FITLOG</span>
                    </Link>
                </div>

                <div className={`${inter.className} text-gray-600 font-light text-[12px]`}>
                    © 2026 FitLog — Workout Library. Train hard, log honest.
                </div>
            </div>
        </div>

    );
};

export default Footer;