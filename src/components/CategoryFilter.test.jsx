/**
 * test scenario for CategoryFilter Component
 *
 * - CategoryFilter Component
 *  - should render the correct number of buttons based on categories
 *  - should call onCategoryChange when a category button is clicked
 *  - should render no buttons when categories array is empty
 *  - should not style any button when selectedCategory is not in categories
 *
 */

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import CategoryFilter from './CategoryFilter';
import '@testing-library/jest-dom/vitest';

describe('CategoryFilter Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render the correct number of buttons based on categories', () => {
    const categories = ['Category One', 'Category Two', 'Category Three'];
    const selectedCategory = 'Category One';

    render(
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={() => {}}
      />
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(categories.length);

    const selectedButton = screen.getByText(selectedCategory);
    expect(selectedButton).toHaveClass('bg-blue-500', 'text-white');
  });

  it('should call onCategoryChange when a category button is clicked', async () => {
    const categories = ['Category One', 'Category Two', 'Category Three'];
    const selectedCategory = 'Category One';
    const onCategoryChange = vi.fn();

    render(
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />
    );

    const categoryTwoButton = screen.getByText('Category Two');
    await userEvent.click(categoryTwoButton);

    expect(onCategoryChange).toHaveBeenCalledWith('Category Two');
  });

  it('should render no buttons when categories array is empty', () => {
    const categories = [];
    const selectedCategory = 'Category One';

    render(
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={() => {}}
      />
    );

    const buttons = screen.queryAllByRole('button');
    expect(buttons).toHaveLength(0);
  });

  it('should not style any button when selectedCategory is not in categories', () => {
    const categories = ['Category One', 'Category Two', 'Category Three'];
    const selectedCategory = 'Music';

    render(
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={() => {}}
      />
    );

    const categoryOneButton = screen.getByText('Category One');
    expect(categoryOneButton).toHaveClass('bg-gray-200', 'text-gray-700');

    const categoryTwoButton = screen.getByText('Category Two');
    expect(categoryTwoButton).toHaveClass('bg-gray-200', 'text-gray-700');

    const categoryThreeButton = screen.getByText('Category Three');
    expect(categoryThreeButton).toHaveClass('bg-gray-200', 'text-gray-700');
  });
});
