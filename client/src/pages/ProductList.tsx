import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchProducts, setFilters } from '../store/slice/productSlice';
import ProductCard from '../components/product/ProductCard';
import Pagination from '../components/product/Pagination';
import ProductFilters from '../components/product/ProductFilters';
import './css/productList.css';

const ProductList: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        products,
        loading,
        error,
        totalPages,
        currentPage,
        filters
    } = useAppSelector(state => state.product);

    useEffect(() => {
        dispatch(fetchProducts(filters));
    }, [dispatch, filters]);

    const handleProductClick = (id: string) => {
        navigate(`/products/${id}`);
    };

    const handlePageChange = (newPage: number) => {
        dispatch(setFilters({ page: newPage }));
        window.scrollTo(0, 0);
    };

    // Ensure all parameters passed to ProductFilters component are non-undefined strings
    const handleFilterChange = (
        newCategory: string,
        newSearch: string,
        newSort: string
    ) => {
        dispatch(setFilters({
            category: newCategory,
            search: newSearch,
            sort: newSort
        }));
    };

    return (
        <div className="product-list-container">
            <h1>Products</h1>

            <ProductFilters
                category={filters.category || ''}
                search={filters.search || ''}
                sort={filters.sort || 'newest'}
                onFilterChange={handleFilterChange}
            />

            {loading ? (
                <div className="loading">Loading products...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : products.length > 0 ? (
                <>
                    <div className="products-grid">
                        {products.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                onProductClick={handleProductClick}
                            />
                        ))}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            ) : (
                <div className="no-products">
                    <p>No products found. Try different filters or add new products.</p>
                </div>
            )}
        </div>
    );
};

export default ProductList;