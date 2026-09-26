import { DataType } from '@/types/dataTypes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProductCard = ({ card }: { card: DataType }) => {
    const {
        id,
        name,
        image,
        muscleGroups,
        equipment,
        difficulty,
        duration,
        caloriesBurned,
        sets,
        reps,
        rating,
        description,
        instructions
    }
        = card;

    return (
        <Link href={`/workouts/${card.id}`} className="block h-full group">
            <div className="card bg-base-100 shadow-sm">
                <figure>
                    <Image
                        src={card.image}
                        alt={card.name}
                        width={400}
                        height={300}
                    />
                </figure>
                <div className="card-body">

                    <div className='muslce-Group'>
                        <div className="flex flex-wrap gap-2">
                            {card.muscleGroups?.map((group, index) => (
                                <span
                                    key={index}
                                    className="rounded-full bg-lime-400 px-3 py-1 text-sm font-semibold text-black"
                                >
                                    {group}
                                </span>
                            ))}
                        </div>
                    </div>

                    <h2 className="card-name">
                        {card.name}
                    </h2>

                    <p>{card.equipment}</p>

                    <div className='flex justify-between'>
                        <p>{card.duration}</p>
                        <p>{card.caloriesBurned}</p>
                        <p>{card.rating}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;

// import Link from 'next/link';

// type CardProps = {
//   card: {
//     id: string | number;
//     name: string;
//     muscleGroups?: string[];
//     rating?: number;
//     duration?: string;
//   };
// };

// export default function ProductCard({ card }: CardProps) {
//   return (
//     <Link href={`/workouts/${card.id}`} className="block h-full group">
//       <div className="h-full rounded-2xl border border-zinc-800 bg-zinc-900 p-5 text-white transition hover:border-lime-400/50 hover:bg-zinc-800/80">
//          <figure>
//                  <Image
//                     src={card.image}
//                     alt={card.name}
//                     width={400}
//                     height={10}
//                 />
//             </figure>
        
//         <h2 className="text-xl font-bold group-hover:text-lime-400 transition-colors">
//           {card.name}
//         </h2>

//         {/* Muscle Groups */}
//         <div className="my-3 flex flex-wrap gap-2">
//           {card.muscleGroups?.map((group, index) => (
//             <span
//               key={index}
//               className="rounded-full bg-lime-400 px-3 py-1 text-xs font-semibold text-black"
//             >
//               {group}
//             </span>
//           ))}
//         </div>

//         {/* Rating & Duration */}
//         <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
//           {card.rating && <span>⭐ {card.rating}</span>}
//           {card.duration && <span>⏱️ {card.duration}</span>}
//         </div>
//       </div>
//     </Link>
//   );
// }