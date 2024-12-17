import PropTypes from 'prop-types';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  const handleCategoryClick = (category) => {
    onCategoryChange(category);
  };

  return (
    <div className="category-filter flex flex-wrap items-center space-x-2 mt-4 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          className={`category-button px-3 py-1 rounded-full text-sm font-medium ${
            selectedCategory === category
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default CategoryFilter;
