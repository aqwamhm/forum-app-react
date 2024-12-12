import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return action.payload.threadDetail;
  case ActionType.CLEAR_THREAD_DETAIL:
    return null;
  case ActionType.ADD_THREAD_COMMENT:
    return {
      ...threadDetail,
      comments: [action.payload.comment, ...threadDetail.comments],
    };
  case ActionType.TOGGLE_VOTE_THREAD_DETAIL:
    if (threadDetail.id === action.payload.threadId) {
      const { userId, voteType } = action.payload;
      let upVotesBy = [...threadDetail.upVotesBy];
      let downVotesBy = [...threadDetail.downVotesBy];

      if (threadDetail.upVotesBy.includes(userId)) {
        upVotesBy = upVotesBy.filter((id) => id !== userId);
      }
      if (threadDetail.downVotesBy.includes(userId)) {
        downVotesBy = downVotesBy.filter((id) => id !== userId);
      }

      if (voteType === 1) {
        upVotesBy.push(userId);
      } else if (voteType === -1) {
        downVotesBy.push(userId);
      }

      return {
        ...threadDetail,
        upVotesBy,
        downVotesBy,
      };
    }
    return threadDetail;
  case ActionType.REVERT_VOTE_THREAD_DETAIL:
    if (threadDetail.id === action.payload.threadId) {
      const { userId, previousVoteType } = action.payload;
      let upVotesBy = [...threadDetail.upVotesBy];
      let downVotesBy = [...threadDetail.downVotesBy];

      if (previousVoteType === 1) {
        upVotesBy.push(userId);
        downVotesBy = downVotesBy.filter((id) => id !== userId);
      } else if (previousVoteType === -1) {
        downVotesBy.push(userId);
        upVotesBy = upVotesBy.filter((id) => id !== userId);
      } else {
        upVotesBy = upVotesBy.filter((id) => id !== userId);
        downVotesBy = downVotesBy.filter((id) => id !== userId);
      }

      return {
        ...threadDetail,
        upVotesBy,
        downVotesBy,
      };
    }
    return threadDetail;
  case ActionType.TOGGLE_VOTE_COMMENT:
    if (
      threadDetail.comments.some(
        (comment) => comment.id === action.payload.commentId
      )
    ) {
      const { userId, voteType } = action.payload;
      let upVotesBy = [
        ...threadDetail.comments.find(
          (comment) => comment.id === action.payload.commentId
        ).upVotesBy,
      ];
      let downVotesBy = [
        ...threadDetail.comments.find(
          (comment) => comment.id === action.payload.commentId
        ).downVotesBy,
      ];

      if (
        threadDetail.comments
          .find(
            (comment) => comment.id === action.payload.commentId
          )
          .upVotesBy.includes(userId)
      ) {
        upVotesBy = upVotesBy.filter((id) => id !== userId);
      }
      if (
        threadDetail.comments
          .find(
            (comment) => comment.id === action.payload.commentId
          )
          .downVotesBy.includes(userId)
      ) {
        downVotesBy = downVotesBy.filter((id) => id !== userId);
      }

      if (voteType === 1) {
        upVotesBy.push(userId);
      } else if (voteType === -1) {
        downVotesBy.push(userId);
      }

      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy,
              downVotesBy,
            };
          }
          return comment;
        }),
      };
    }
    return threadDetail;
  case ActionType.REVERT_VOTE_COMMENT:
    if (
      threadDetail.comments.some(
        (comment) => comment.id === action.payload.commentId
      )
    ) {
      const { userId, previousVoteType } = action.payload;
      let upVotesBy = [
        ...threadDetail.comments.find(
          (comment) => comment.id === action.payload.commentId
        ).upVotesBy,
      ];
      let downVotesBy = [
        ...threadDetail.comments.find(
          (comment) => comment.id === action.payload.commentId
        ).downVotesBy,
      ];

      if (previousVoteType === 1) {
        upVotesBy.push(userId);
        downVotesBy = downVotesBy.filter((id) => id !== userId);
      } else if (previousVoteType === -1) {
        downVotesBy.push(userId);
        upVotesBy = upVotesBy.filter((id) => id !== userId);
      } else {
        upVotesBy = upVotesBy.filter((id) => id !== userId);
        downVotesBy = downVotesBy.filter((id) => id !== userId);
      }

      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy,
              downVotesBy,
            };
          }
          return comment;
        }),
      };
    }
    return threadDetail;
  default:
    return threadDetail;
  }
}

export default threadDetailReducer;
