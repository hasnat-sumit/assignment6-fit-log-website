import Image from 'next/image';
import React from 'react';

const Banner = () => {
    return (
        <div className=' flex justify-between items-center container mx-auto mt-15 mb-20 border  border-gray-800/50 rounded-2xl px-10 py-10 bg-[#16181e]'>
            <div className=''>
                <h4 className='mb-5 text-lime-400'>WORKOUT LIBRARY</h4>
                <h1 className='text-5xl font-bold text-white mb-5'>TRAIN WITH INTENT. LOG <br /> EVERY SET.</h1>
                <p className='mb-5 text-gray-400'>FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
                    into today's plan, and watch the week's work add up.</p>
                <button className='btn rounded-lg bg-lime-600'>BROWSE WORKOUTS</button>
            </div>
            

            <div className=''>
                <Image src='/assets/banner.png' alt='Workout banner' width={500} height={100}/>
            </div>
        </div>
    );
};

export default Banner;