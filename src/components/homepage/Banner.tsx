import Image from 'next/image';
import React from 'react';

const Banner = () => {
  return (
    <div className="container mx-auto mt-6 mb-12 sm:mt-10 sm:mb-16 lg:mt-15 lg:mb-20 px-4 sm:px-6">
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-8 lg:gap-12 border border-gray-800/50 rounded-2xl p-6 sm:p-8 lg:p-10 bg-[#16181e]">
        
        {/* Left Column: Text & CTA */}
        <div className="w-full lg:w-1/2 text-left">
          <h4 className="mb-3 sm:mb-5 text-sm sm:text-base font-semibold tracking-wider text-lime-400">
            WORKOUT LIBRARY
          </h4>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-5 leading-tight sm:leading-snug">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>
          
          <p className="mb-6 text-sm sm:text-base text-gray-400 leading-relaxed max-w-xl">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          
          <button className="w-full sm:w-auto px-6 py-3 rounded-lg bg-lime-600 hover:bg-lime-500 text-black font-semibold transition-colors duration-200">
            BROWSE WORKOUTS
          </button>
        </div>

        {/* Right Column: Image */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
            <Image
              src="/assets/banner.png"
              alt="Workout banner"
              width={500}
              height={300}
              priority
              className="w-full h-auto object-cover rounded-xl"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Banner;