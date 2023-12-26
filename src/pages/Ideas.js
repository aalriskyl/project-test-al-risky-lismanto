import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/ideas.css';
import Banner from './Banner';

function Ideas() {
  const [ideas, setIdeas] = useState([]);
  const [sortBy, setSortBy] = useState('published_at');
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://suitmedia-backend.suitdev.com/api/ideas', {
        params: {
          'page[number]': currentPage,
          'page[size]': perPage,
          append: ['small_image', 'medium_image'],
          sort: sortBy,
        },
      });

      console.log('API Response:', response.data);

      setIdeas(response.data.data);
      setTotalPages(response.data.meta.last_page);
    } catch (error) {
      console.error('Error fetching data:', error);

      if (error.response && error.response.status === 429) {
        await new Promise(resolve => setTimeout(resolve, 5000)); 
        fetchData(); 
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [sortBy, perPage, currentPage]);

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    const newSortBy = sortBy === selectedSort ? `-${selectedSort}` : selectedSort;
    setSortBy(newSortBy);
    setCurrentPage(1); // Reset to the first page when changing sorting
  };
  
  

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPaginationControls = () => {
    const pageButtons = [];

    // Render first page button
    pageButtons.push(
      <button key="first" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
        {'<<'}
      </button>
    );

    // Render previous page button
    pageButtons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {'<'}
      </button>
    );

    // Render page numbers
    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={currentPage === i}
        >
          {i}
        </button>
      );
    }

    // Render next page button
    pageButtons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {'>'}
      </button>
    );

    // Render last page button
    pageButtons.push(
      <button
        key="last"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        {'>>'}
      </button>
    );

    return pageButtons;
  };

  return (
    <div className="ideas-container">
      <div className="banner-container">
      <Banner />
      </div>
      <div className="labels-container">
      <label>
        Show per page:
        <select value={perPage} onChange={handlePerPageChange}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </label>

      <label>
        Sort by:
        <select value={sortBy} onChange={handleSortChange}>
          <option value="published_at">Published At</option>
          <option value="-published_at">Published At (Descending)</option>
        </select>
      </label>
</div>
      <div className="ideas-grid">
        {ideas.map((idea, index) => (
          <div key={idea.id} className="idea-card">
            <img src={idea.small_image[0].url} alt={idea.title} loading="lazy" />
            <h3>{idea.title}</h3>
            <p>{idea.description}</p>
          </div>
        ))}
      </div>

      <div className="pagination-controls">
        {renderPaginationControls()}
      </div>
    </div>
  );
}

export default Ideas;
