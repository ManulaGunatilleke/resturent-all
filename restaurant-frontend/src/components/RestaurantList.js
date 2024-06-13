import React from 'react';
import RestaurantItem from './RestaurantItem';

const RestaurantList = ({ restaurants, onDelete, fetchRestaurants }) => {
    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Restaurant List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map((restaurant) => (
                    <RestaurantItem
                        key={restaurant._id}
                        restaurant={restaurant}
                        onDelete={onDelete}
                        fetchRestaurants={fetchRestaurants} />
                ))}
            </div>
        </div>
    );
};

export default RestaurantList;
