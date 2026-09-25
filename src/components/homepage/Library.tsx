import React from 'react';
import ProductCard from '../ProductCard';

type Card = {
    id: string | number;
    name: string;
};

const Library = async () => {

    const res = await fetch('https://api.abcz.workers.dev/api/fitlog');
    const cardData: Card[] = await res.json();


    return (
        <div className='container mx-auto'>
            <div>
                <h1 className='text-3xl font-bold'>THE LIBRARY</h1>
                <p className='text-gray-500 mb-10'>Twelve lifts covering every major muscle group.</p>
            </div>

            <div className='grid grid-cols-3 gap-4 rounded-2xl '>

                {cardData.map((card) => (
                    <ProductCard key={card.id} card={card} />
                ))}
            </div>
        </div>

    );
};

export default Library;