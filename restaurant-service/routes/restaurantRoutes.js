const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.post('/restaurants', restaurantController.createRestaurant);
router.get('/restaurants/:id', restaurantController.getRestaurantById);
router.put('/restaurants/:id', restaurantController.updateRestaurant);
router.delete('/restaurants/:id', restaurantController.deleteRestaurant);
router.get('/restaurants', restaurantController.listRestaurants);

module.exports = router;
