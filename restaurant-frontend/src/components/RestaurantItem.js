import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UpdateRestaurantModal from './UpdateRestaurantModal';

const RestaurantItem = ({ restaurant, onDelete, fetchRestaurants }) => {
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const openUpdateModal = () => {
        setIsUpdateModalOpen(true);
    };

    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false);
    };

    const openDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleDelete = async () => {
        try {
            await onDelete(restaurant._id);
            closeDeleteModal();
        } catch (error) {
            console.error('Failed to delete restaurant:', error);
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
                <h2 className="text-xl font-bold">{restaurant.name}</h2>
                <p className="text-gray-700">{restaurant.address}</p>
                <p className="text-gray-700">{restaurant.telephone}</p>
                <div className="flex space-x-4 mt-4">
                    <Link
                        to={`/restaurants/${restaurant._id}`}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                    >
                        View Item
                    </Link>
                    <button
                        onClick={openUpdateModal}
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200"
                    >
                        Update
                    </button>
                    <button
                        onClick={openDeleteModal} // Open delete confirmation modal
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
                    >
                        Delete
                    </button>
                </div>
            </div>
            <UpdateRestaurantModal
                isOpen={isUpdateModalOpen}
                closeModal={closeUpdateModal}
                fetchRestaurants={fetchRestaurants}
                restaurant={restaurant}
            />
            {/* Delete confirmation modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center">
                    <div className="bg-gray-800 bg-opacity-75 absolute inset-0"></div>
                    <div className="relative bg-white p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
                        <p className="mb-4">Are you sure you want to delete {restaurant.name}?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                            <button
                                onClick={closeDeleteModal}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RestaurantItem;
