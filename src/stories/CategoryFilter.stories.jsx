import { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';

export default {
  title: 'Components/CategoryFilter',
  component: CategoryFilter,
  argTypes: {
    onCategoryChange: { action: 'categoryChanged' },
  },
};

const TemplateStory = (args) => {
  const [selectedCategory, setSelectedCategory] = useState(
    args.selectedCategory
  );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    args.onCategoryChange(category);
  };

  return (
    <CategoryFilter
      {...args}
      selectedCategory={selectedCategory}
      onCategoryChange={handleCategoryChange}
    />
  );
};

export const WithNoSelectedCategory = TemplateStory.bind({});
WithNoSelectedCategory.args = {
  categories: ['Perkenalan', 'Redux'],
  selectedCategory: '',
};

export const WithSelectedCategory = TemplateStory.bind({});
WithSelectedCategory.args = {
  categories: ['Perkenalan', 'Redux'],
  selectedCategory: 'Redux',
};
