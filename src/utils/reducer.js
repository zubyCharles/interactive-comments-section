import data from '../data/comments.json';

const { currentUser } = data;

const reducer = (state, action) => {
  switch (action.type) {
    case 'addNew':
      return [
        ...state,
        {
          id: action.id,
          user: action.user,
          content: action.content,
          replies: action.replies,
          liked: action.liked,
          score: action.score,
        },
      ];
    case 'add':
      return [
        ...state,
        {
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

export default reducer;