import data from '../data/comments.json';

const { currentUser } = data;

export const replyReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        {
          id: action.id,
          username: action.username,
          content: action.content,
          liked: action.liked,
          score: action.score,
          user: { image: { png: currentUser.image.png } },
          replyingTo: action.replyingTo,
          replies: action.replies,
        },
      ];
    case 'update':
      return state.map((reply, index) =>
        index === action.index ? { ...reply, content: action.content } : reply
      );
    case 'delete':
      return state.filter((_, index) => index !== action.index);
    default:
      return state;
  }
};

export const commentReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        {
          id: action.id,
          user: action.user,
          content: action.content,
          createdAt: action.createdAt,
          liked: action.liked,
          score: action.score,
          replies: action.replies,
        },
      ];
    default:
      return state;
  }
};
