/**
 * test scenario for LeaderboardsItem Component
 *
 * - LeaderboardsItem Component
 *  - should render the component with correct props
 *  - should display the correct user information and score
 *
 */

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import LeaderboardsItem from './LeaderboardsItem';
import '@testing-library/jest-dom/vitest';

describe('LeaderboardsItem Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render the component with correct props', () => {
    const entry = {
      user: {
        id: 'user-1',
        avatar: 'avatar-url',
        name: 'John Doe',
      },
      score: 100,
    };
    const index = 0;

    render(<LeaderboardsItem entry={entry} index={index} />);

    const rank = screen.getByText('1');
    expect(rank).toBeInTheDocument();

    const avatar = screen.getByAltText(entry.user.name);
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', entry.user.avatar);

    const name = screen.getByText(entry.user.name);
    expect(name).toBeInTheDocument();

    const score = screen.getByText('100 points');
    expect(score).toBeInTheDocument();
  });

  it('should display the correct user information and score', () => {
    const entry = {
      user: {
        id: 'user-2',
        avatar: 'another-avatar-url',
        name: 'Jane Smith',
      },
      score: 200,
    };
    const index = 1;

    render(<LeaderboardsItem entry={entry} index={index} />);

    const rank = screen.getByText('2');
    expect(rank).toBeInTheDocument();

    const avatar = screen.getByAltText(entry.user.name);
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', entry.user.avatar);

    const name = screen.getByText(entry.user.name);
    expect(name).toBeInTheDocument();

    const score = screen.getByText('200 points');
    expect(score).toBeInTheDocument();
  });
});
