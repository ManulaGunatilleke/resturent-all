import axios from 'axios';

const API_URL = 'http://localhost:5000/api/restaurants';

export const getAllRestaurants = async () => {
    return await axios.get(API_URL);
};

export const getRestaurantById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
};

export const createRestaurant = async (restaurant) => {
    return await axios.post(API_URL, restaurant);
};

export const updateRestaurant = async (id, restaurant) => {
    return await axios.put(`${API_URL}/${id}`, restaurant);
};

export const deleteRestaurant = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};
