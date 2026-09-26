import React from 'react';
import ProductCard from '../ProductCard';

const Library = async () => {
  let cardData: React.ComponentProps<typeof ProductCard>['card'][] = [];

  try {
    const res = await fetch('https://api.abcz.workers.dev/api/fitlog', {
      next: { revalidate: 3600 }, // Optional caching strategy
    });

    if (res.ok) {
      cardData = await res.json();
    }
  } catch (error) {
    console.error('Failed to fetch workouts:', error);
  }

  return (
    <section className="container mx-auto px-4 sm:px-6 mb-12 sm:mb-16 lg:mb-20">
      {/* Header Section */}
      <div className="mb-6 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          THE LIBRARY
        </h1>
        <p className="text-sm sm:text-base text-gray-400 mt-1">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* Responsive Cards Grid */}
      {cardData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {cardData.map((card) => (
            <ProductCard key={card.id} card={card} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-gray-800/50 rounded-2xl bg-[#16181e] text-gray-400">
          <p>No workouts found right now. Please check back later.</p>
        </div>
      )}
    </section>
  );
};

export default Library;