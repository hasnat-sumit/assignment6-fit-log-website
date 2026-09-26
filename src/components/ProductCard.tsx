'use client';

import { DataType } from '@/types/dataTypes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Clock, Flame, Star } from 'lucide-react';

const ProductCard = ({ card }: { card: DataType }) => {
  return (
    <Link 
      href={`/workouts/${card.id}`} 
      className="block h-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded-2xl"
    >
      <div className="bg-[#16181e] rounded-2xl overflow-hidden shadow-lg border border-gray-800/50 flex flex-col h-full transition-all duration-200 group-hover:-translate-y-1 group-hover:border-gray-700/80">
        
        {/* Top Half: Image with responsive aspect ratio */}
        <div className="relative w-full aspect-video overflow-hidden bg-gray-900">
          <Image
            src={card.image}
            alt={card.name}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        </div>

        {/* Bottom Half: Content */}
        <div className="p-4 sm:p-5 flex flex-col justify-between grow gap-4">
          
          <div className="space-y-2.5 sm:space-y-3">
            {/* Muscle Group Badges */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {card.muscleGroups?.map((group, index) => (
                <span
                  key={index}
                  className="rounded-full bg-[#ccff00] px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-xs font-black tracking-wider text-black uppercase"
                >
                  {group}
                </span>
              ))}
            </div>

            {/* Title & Equipment */}
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-wide uppercase leading-snug line-clamp-2">
                {card.name}
              </h3>
              <p className="text-xs font-medium text-gray-400 mt-1 line-clamp-1">
                {card.equipment}
              </p>
            </div>
          </div>

          {/* Bottom Stats Meta Bar */}
          <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-gray-400 pt-3 border-t border-gray-800/40 mt-auto">
            {card.duration && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>{card.duration}</span>
              </div>
            )}

            {card.caloriesBurned && (
              <div className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>{card.caloriesBurned}</span>
              </div>
            )}

            {card.rating && (
              <div className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500 shrink-0" />
                <span>{card.rating}</span>
              </div>
            )}
          </div>

        </div>
      </div>
    </Link>
  );
};

export default ProductCard;