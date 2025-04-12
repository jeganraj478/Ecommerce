import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import Spinner from './components/common/Spinner'


const Home = lazy(() => import('./pages/Home'))
const CartPage = lazy(() => import('./pages/CartPage'))
const ProductsList = lazy(() => import('./pages/ProductList'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Navbar = lazy(() => import('./components/layout/Navbar'))
const Register = lazy(() => import('./components/auth/Register'))



const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route element={<Navbar />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/products/category/:category" element={<ProductsList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
          </Route>
          <Route path="*" element={<div>..Not found</div>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
