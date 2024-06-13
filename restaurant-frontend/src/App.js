import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RestaurantContainer from './components/RestaurantContainer';
import RestaurantDetails from './pages/RestaurantDetails';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route exact path="/" element={<RestaurantContainer />} />
                    <Route path="/restaurants/:id" element={<RestaurantDetails />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
