import React, { useEffect, useState } from 'react';
import { getAllRestaurants, deleteRestaurant } from '../services/restaurantService';
import RestaurantList from './RestaurantList';
import AddRestaurantModal from './AddRestaurantModal';


const RestaurantContainer = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchRestaurants = async () => {
        try {
            const result = await getAllRestaurants();
            setRestaurants(result.data);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        }
    };

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const onDelete = async (restaurantId) => {
        try {

            const response = await deleteRestaurant(restaurantId);
            if (response) {
                fetchRestaurants();
                console.log(`Deleting restaurant with ID: ${restaurantId}`);
            }

        } catch (error) {
            console.error('Failed to delete restaurant:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <button
                onClick={() => setIsModalOpen(true)}
                className="rounded bg-slate-600 text-white px-6 py-2 font-semibold my-4"
            >
                Add Restaurant
            </button>
            <AddRestaurantModal
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                fetchRestaurants={fetchRestaurants}
            />
            <RestaurantList
                restaurants={restaurants}
                onDelete={onDelete}
                fetchRestaurants={fetchRestaurants}
            />
        </div>
    );
};

export default RestaurantContainer;
