import React, { useState } from 'react';
import { createRestaurant } from '../services/restaurantService';

const RestaurantForm = ({ fetchRestaurants }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [telephone, setTelephone] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newRestaurant = { name, address, telephone };
            await createRestaurant(newRestaurant);
            // Reset form fields
            setName('');
            setAddress('');
            setTelephone('');
            // Fetch updated list of restaurants
            fetchRestaurants();
        } catch (error) {
            console.error('Failed to create restaurant', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-6">
            <h2 className="text-2xl font-bold mb-4">Add New Restaurant</h2>
            <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border rounded w-full py-2 px-3"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border rounded w-full py-2 px-3"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Telephone</label>
                <input
                    type="text"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    className="border rounded w-full py-2 px-3"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
        </form>
    );
};

export default RestaurantForm;
