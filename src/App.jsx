import { useReducer, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContext } from './components/AppContext';
import { cartControls } from './components/cartControls';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import CartPage from './pages/CartPage';
import CheckoutProcess from './pages/CheckoutProcess';
import ConfirmationPage from './pages/ConfirmationPage';
import SurveyPage from './pages/SurveyPage';

function App() {
    const [cart, dispatch] = useReducer(cartControls, []);
    const [orderDetails, setOrderDetails] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);

    const contextValue = {
        cart, dispatch,
        orderDetails, setOrderDetails,
        activeCategory, setActiveCategory
    };

    return (
        <AppContext.Provider value={contextValue}>
            <Router basename="/PartPicks/">
                <div className="app-container bg-dark text-light" data-bs-theme="dark">
                    <Header />
                    <main className="flex-grow-1">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="products/:category?" element={<ProductListPage />} />
                            <Route path="cart" element={<CartPage />} />
                            <Route path="checkout" element={<CheckoutProcess />} />
                            <Route path="confirmation" element={<ConfirmationPage />} />
                            <Route path="survey" element={<SurveyPage />} />
                        </Routes>
                    </main>
                    <footer className="bg-black text-center text-muted py-4 mt-auto">
                        <p className="mb-0">Designed by Sebastian Del Pino.</p>
                    </footer>
                </div>
            </Router>
        </AppContext.Provider>
    );
}

export default App;
