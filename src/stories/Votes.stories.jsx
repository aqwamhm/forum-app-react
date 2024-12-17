import { useState } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Votes from '../components/Votes';

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: (state = initialState) => state,
  });
};

export default {
  title: 'Components/Votes',
  component: Votes,
  argTypes: {
    asyncToggle: { action: 'voteTrigger' },
  },
  decorators: [
    (Story) => (
      <div className="p-4 flex justify-center items-center">
        <Story />
      </div>
    ),
  ],
};

const TemplateStory = (args) => {
  const [upVotesBy, setUpVotesBy] = useState(args.upVotesBy);
  const [downVotesBy, setDownVotesBy] = useState(args.downVotesBy);

  const mockAsyncToggle = (payload) => {
    const { voteType } = payload;

    if (voteType === 1) {
      setUpVotesBy((prev) =>
        prev.includes(args.userId)
          ? prev.filter((id) => id !== args.userId)
          : [...prev, args.userId]
      );
      setDownVotesBy((prev) => prev.filter((id) => id !== args.userId));
    } else if (voteType === -1) {
      setDownVotesBy((prev) =>
        prev.includes(args.userId)
          ? prev.filter((id) => id !== args.userId)
          : [...prev, args.userId]
      );
      setUpVotesBy((prev) => prev.filter((id) => id !== args.userId));
    } else {
      setUpVotesBy((prev) => prev.filter((id) => id !== args.userId));
      setDownVotesBy((prev) => prev.filter((id) => id !== args.userId));
    }

    args.asyncToggle(payload);
  };

  const store = createMockStore();

  return (
    <Provider store={store}>
      <Votes
        {...args}
        upVotesBy={upVotesBy}
        downVotesBy={downVotesBy}
        asyncToggle={mockAsyncToggle}
      />
    </Provider>
  );
};

export const UserNotLoggedIn = TemplateStory.bind({});
UserNotLoggedIn.args = {
  upVotesBy: [],
  downVotesBy: [],
  objectContentId: { threadId: '123' },
  userId: null,
};

export const UserLoggedInNoVote = TemplateStory.bind({});
UserLoggedInNoVote.args = {
  upVotesBy: [],
  downVotesBy: [],
  objectContentId: { threadId: '123' },
  userId: 'user1',
};

export const UserUpvoted = TemplateStory.bind({});
UserUpvoted.args = {
  upVotesBy: ['user1'],
  downVotesBy: [],
  objectContentId: { threadId: '123' },
  userId: 'user1',
};

export const UserDownvoted = TemplateStory.bind({});
UserDownvoted.args = {
  upVotesBy: [],
  downVotesBy: ['user1'],
  objectContentId: { threadId: '123' },
  userId: 'user1',
};

export const MultipleVotes = TemplateStory.bind({});
MultipleVotes.args = {
  upVotesBy: ['user1', 'user2', 'user4', 'user4'],
  downVotesBy: ['user3'],
  objectContentId: { threadId: '123' },
  userId: 'user1',
};
