import React, { useState, useEffect } from 'react';
import './css/productFilters.css';

interface ProductFiltersProps {
    category: string;
    search: string;
    sort: string;
    onFilterChange: (category: string, search: string, sort: string) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
    category,
    search,
    sort,
    onFilterChange
}) => {
    const [localSearch, setLocalSearch] = useState(search);

    // Categories would typically come from an API, but for this example:
    const categories = [
        'All',
        'Electronics',
        'Clothing',
        'Home & Kitchen',
        'Beauty',
        'Books',
        'Sports'
    ];

    const sortOptions = [
        { value: 'newest', label: 'Newest First' },
        { value: 'price_asc', label: 'Price: Low to High' },
        { value: 'price_desc', label: 'Price: High to Low' },
        { value: 'rating', label: 'Top Rated' }
    ];

    // Update local search when prop changes
    useEffect(() => {
        setLocalSearch(search);
    }, [search]);

    // Debounce search to avoid too many API calls
    useEffect(() => {
        const timer = setTimeout(() => {
            if (localSearch !== search) {
                onFilterChange(category, localSearch, sort);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [localSearch, category, search, sort, onFilterChange]);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategory = e.target.value === 'All' ? '' : e.target.value;
        onFilterChange(newCategory, localSearch, sort);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterChange(category, localSearch, e.target.value);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearch(e.target.value);
    };

    const handleClearFilters = () => {
        setLocalSearch('');
        onFilterChange('', '', 'newest');
    };

    return (
        <div className="product-filters">
            <div className="filter-group search-filter">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={localSearch}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>

            <div className="filter-group category-filter">
                <select
                    value={category || 'All'}
                    onChange={handleCategoryChange}
                    className="category-select"
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-group sort-filter">
                <select
                    value={sort || 'newest'}
                    onChange={handleSortChange}
                    className="sort-select"
                >
                    {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <button
                className="clear-filters"
                onClick={handleClearFilters}
            >
                Clear Filters
            </button>
        </div>
    );
};

export default ProductFilters;