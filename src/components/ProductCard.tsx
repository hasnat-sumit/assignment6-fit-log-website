import { DataType } from '@/types/dataTypes';
import Image from 'next/image';
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
        <div className="card bg-base-100 shadow-sm">
            <figure>
                <Image
                    src={card.image}
                    alt={card.name}
                    width={400}
                    height={10}
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
    );
};

export default ProductCard;

