import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { createRestaurant } from '../services/restaurantService';

const AddRestaurantModal = ({ isOpen, closeModal, fetchRestaurants }) => {
    const [restaurant, setRestaurant] = useState({
        name: "",
        address: "",
        telephone: "",
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRestaurant({ ...restaurant, [name]: value });
    };

    const validate = () => {
        const errors = {};
        if (!restaurant.name) errors.name = "Name is required";
        if (!restaurant.address) errors.address = "Address is required";
        const phonePattern = /^[0-9]{10}$/; 
        if (!restaurant.telephone) {
            errors.telephone = "Telephone is required";
        } else if (!phonePattern.test(restaurant.telephone)) {
            errors.telephone = "Telephone must be a valid 10-digit number";
        }
        return errors;
    };

    const saveRestaurant = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        try {
            setIsLoading(true);
            await createRestaurant(restaurant);
            resetForm();
            fetchRestaurants(); // Fetch updated list of restaurants
        } catch (error) {
            console.error('Failed to create restaurant', error);
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setRestaurant({
            name: "",
            address: "",
            telephone: "",
        });
        setErrors({});
        closeModal();
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
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
                                Add New Restaurant
                            </Dialog.Title>
                            <div className="mt-2">
                                <form onSubmit={saveRestaurant}>
                                    <div className="h-14 my-4">
                                        <label className="block text-gray-600 text-sm font-normal">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={restaurant.name}
                                            onChange={handleChange}
                                            className="h-10 w-96 border mt-2 px-2 py-2"
                                        ></input>
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
                                            value={restaurant.address}
                                            onChange={handleChange}
                                            className="h-10 w-96 border mt-2 px-2 py-2"
                                        ></input>
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
                                            value={restaurant.telephone}
                                            onChange={handleChange}
                                            className="h-10 w-96 border mt-2 px-2 py-2"
                                        ></input>
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
                                            {isLoading ? 'Saving...' : 'Save'}
                                        </button>
                                        <button
                                            onClick={resetForm}
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

export default AddRestaurantModal;
