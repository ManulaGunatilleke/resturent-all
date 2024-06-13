import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRestaurantById } from '../services/restaurantService';

const RestaurantDetails = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getRestaurantById(id);
            setRestaurant(result.data);
        };
        fetchData();
    }, [id]);

    if (!restaurant) {
        return <div className="container mx-auto text-center mt-8">Loading...</div>;
    }

    return (
        <div className="container mx-auto mt-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden p-8">
                <h1 className="text-3xl font-bold mb-4">{restaurant.name}</h1>
                <p className="text-gray-700 mb-2">{restaurant.address}</p>
                <p className="text-gray-700 mb-2">{restaurant.telephone}</p>
            </div>
        </div>
    );
};

export default RestaurantDetails;
