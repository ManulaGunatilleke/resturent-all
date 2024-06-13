import React, { useState, useEffect } from 'react';
import RestaurantList from '../components/RestaurantList';
import AddRestaurantModal from '../components/AddRestaurantModal';
import { getAllRestaurants } from '../services/restaurantService';

const Home = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchRestaurantData = async () => {
        try {
            const response = await getAllRestaurants();
            setRestaurants(response.data);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        }
    };

    useEffect(() => {
        fetchRestaurantData();
    }, []);

    return (
        <div className="container mx-auto">
            <button
                onClick={() => setIsModalOpen(true)}
                className="rounded bg-slate-600 text-white px-6 py-2 font-semibold my-4"
            >
                Add Restaurant
            </button>
            <AddRestaurantModal
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                fetchRestaurants={fetchRestaurantData}
            />
            <RestaurantList restaurants={restaurants} />
        </div>
    );
};

export default Home;
