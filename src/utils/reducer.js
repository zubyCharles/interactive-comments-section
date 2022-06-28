import data from '../data/comments.json';

const { currentUser } = data;

const reducer = (state, action) => {
  switch (action.type) {
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
        },
      ];
    case 'update':
      return state.map((obj, index) =>
        index === action.index ? { ...obj, content: action.content } : obj
      );
    case 'delete':
      return state.filter((_, index) => index !== action.index);
    default:
      return state;
  }
};

export default reducer;
