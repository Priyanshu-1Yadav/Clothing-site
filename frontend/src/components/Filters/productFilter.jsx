import React, { useState } from 'react';
import './productFilter.css';
import { FaChevronLeft } from 'react-icons/fa';

const ProductFilter = ({ filters, selectedFilters, setSelectedFilters, isMobile, showFilters, setShowFilters }) => {
    const handleCheckboxChange = (filterCategory, option) => {
        const updatedFilters = { ...selectedFilters };

        // Toggle filter option
        if (updatedFilters[filterCategory]?.includes(option)) {
            updatedFilters[filterCategory] = updatedFilters[filterCategory].filter(item => item !== option);
        } else {
            if (!updatedFilters[filterCategory]) {
                updatedFilters[filterCategory] = [];
            }
            updatedFilters[filterCategory].push(option);
        }

        setSelectedFilters(updatedFilters);
    };

    return (
        <div className={`filter-panel ${showFilters ? 'show-filters' : 'hide-filters'}`}>
            FILTERS
            {isMobile && (
                <button onClick={() => setShowFilters(false)} className="toggle-filters">
                    <FaChevronLeft /> Hide Filters
                </button>
            )}

            {filters.map((filter, index) => (
                <div key={index} className="filter-group">
                    <h2 className="filter-name">{filter.name}</h2>
                    <ul className="filter-options">
                        {filter.options.map((option, i) => (
                            <li key={i} className="filter-option">
                                <input
                                    type="checkbox"
                                    checked={selectedFilters[filter.name]?.includes(option)}
                                    onChange={() => handleCheckboxChange(filter.name, option)}
                                />
                                <span>{option}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default ProductFilter;
