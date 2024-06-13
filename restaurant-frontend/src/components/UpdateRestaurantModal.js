import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { updateRestaurant } from '../services/restaurantService';

const UpdateRestaurantModal = ({ isOpen, closeModal, fetchRestaurants, restaurant }) => {
    const [updatedRestaurant, setUpdatedRestaurant] = useState({
        name: restaurant.name,
        address: restaurant.address,
        telephone: restaurant.telephone,
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdatedRestaurant({ ...updatedRestaurant, [name]: value });
    };

    const validate = () => {
        const errors = {};
        if (!updatedRestaurant.name) 
            errors.name = "Name is required";
        if (!updatedRestaurant.address) 
            errors.address = "Address is required";
        const phonePattern = /^[0-9]{10}$/; 
        if (!updatedRestaurant.telephone) {
            errors.telephone = "Telephone is required";
        } else if (!phonePattern.test(updatedRestaurant.telephone)) {
            errors.telephone = "Telephone must be a valid 10-digit number";
        }
        return errors;
    };

    const saveUpdatedRestaurant = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        try {
            setIsLoading(true);
            await updateRestaurant(restaurant._id, updatedRestaurant);
            fetchRestaurants(); // Fetch updated list of restaurants
            closeModal();
        } catch (error) {
            console.error('Failed to update restaurant', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Transition appear show={isOpen} as={React.Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={closeModal}
            >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                Update Restaurant
                            </Dialog.Title>
                            <div className="mt-2">
                                <form onSubmit={saveUpdatedRestaurant}>
                                    <div className="h-14 my-4">
                                        <label className="block text-gray-600 text-sm font-normal">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={updatedRestaurant.name}
                                            onChange={handleChange}
                                            className="h-10 w-96 border mt-2 px-2 py-2"
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-sm">{errors.name}</p>
                                        )}
                                    </div>
                                    <div className="h-14 my-4">
                                        <label className="block text-gray-600 text-sm font-normal">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={updatedRestaurant.address}
                                            onChange={handleChange}
                                            className="h-10 w-96 border mt-2 px-2 py-2"
                                        />
                                        {errors.address && (
                                            <p className="text-red-500 text-sm">{errors.address}</p>
                                        )}
                                    </div>
                                    <div className="h-14 my-4">
                                        <label className="block text-gray-600 text-sm font-normal">
                                            Telephone
                                        </label>
                                        <input
                                            type="text"
                                            name="telephone"
                                            value={updatedRestaurant.telephone}
                                            onChange={handleChange}
                                            className="h-10 w-96 border mt-2 px-2 py-2"
                                        />
                                        {errors.telephone && (
                                            <p className="text-red-500 text-sm">{errors.telephone}</p>
                                        )}
                                    </div>
                                    <div className="h-14 my-4 space-x-4 pt-4">
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className={`rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            {isLoading ? 'Updating...' : 'Update'}
                                        </button>
                                        <button
                                            onClick={closeModal}
                                            className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default UpdateRestaurantModal;
