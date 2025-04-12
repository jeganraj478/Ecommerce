// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from './store';

// // Layout Components
// import Header from './components/Header';
// import Footer from './components/Footer';

// // Page Components
// import Home from './pages/Home';
// import ProductsList from './pages/ProductsList';
// import ProductDetail from './components/ProductDetail';
// import Cart from './pages/Cart';
// import Checkout from './pages/Checkout';
// import OrderConfirmation from './pages/OrderConfirmation';
// import UserProfile from './pages/UserProfile';
// import NotFound from './pages/NotFound';

// const App: React.FC = () => {
//   return (
//     <Provider store={store}>
//       <Router>
//         <div className="app">
//           <Header />
//           <main className="main-content">
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/products" element={<ProductsList />} />
//               <Route path="/products/category/:category" element={<ProductsList />} />
//               <Route path="/product/:id" element={<ProductDetail />} />
//               <Route path="/cart" element={<Cart />} />
//               <Route path="/checkout" element={<Checkout />} />
//               <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
//               <Route path="/profile" element={<UserProfile />} />
//               <Route path="/404" element={<NotFound />} />
//               <Route path="*" element={<Navigate to="/404" replace />} />
//             </Routes>
//           </main>
//           <Footer />
//         </div>
//       </Router>
//     </Provider>
//   );
// };

// export default App;