import React, { useState } from 'react';
import './SortBox.css';

const SortBox = ({ onSort }) => {
    const [sortOption, setSortOption] = useState('releaseYear');
    const [sortOrder, setSortOrder] = useState('ascending');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Toggle modal visibility
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // Handle sorting
    const handleSort = () => {
        // Call onSort with selected sort option and order
        onSort(sortOption, sortOrder);
        toggleModal(); // Close modal after sorting
    };

    return (
        <div>
            {/* Button to open the sort modal */}
            <button onClick={toggleModal}>Sort Trailers</button>

            {/* Modal for sorting */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Sort Trailers</h2>
                        <div className="sort-options">
                            <label>
                                Sort By:
                                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                                    <option value="releaseYear">Release Year</option>
                                    <option value="minAgeLimit">Minimum Age Limit</option>
                                    <option value="creationTime">Creation Time</option>
                                </select>
                            </label>
                            <label>
                                Order:
                                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                                    <option value="ascending">Ascending</option>
                                    <option value="descending">Descending</option>
                                </select>
                            </label>
                        </div>
                        <button onClick={handleSort}>Apply Sort</button>
                        <button onClick={toggleModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SortBox;
