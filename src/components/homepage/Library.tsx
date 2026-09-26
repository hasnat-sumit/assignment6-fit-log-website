import React from 'react';
import ProductCard from '../ProductCard';

const Library = async () => {

    const res = await fetch('https://api.abcz.workers.dev/api/fitlog');
    const cardData: React.ComponentProps<typeof ProductCard>['card'][] = await res.json();


    return (
        <div className='container mx-auto mb-20'>
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