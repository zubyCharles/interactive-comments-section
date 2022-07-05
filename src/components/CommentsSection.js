import React, { useReducer, useRef } from 'react';
import { commentReducer as reducer } from '../utils/reducer';
import Comment from './Comments';
import data from '../data/comments.json';

const { currentUser } = data;

const CommentsList = () => {
  const commentInputRef = useRef();
  const [comments, Dispatch] = useReducer(reducer, data.comments);

  const addComment = () => {
    if (commentInputRef.current.value.match(/^$/)) {
      return;
    }
    Dispatch({
      type: 'add',
      id: comments.length + 1,
      user: currentUser,
      content: commentInputRef.current.value,
      createdAt: 'now',
      liked: false,
      score: 0,
      replies: [],
    });
    commentInputRef.current.value = '';
  };

  return (
    <main className="lg:w-6/12 lg:my-0 lg:mx-auto">
      <div className="">
        {comments.map((comment) => (
          <Comment commentObject={comment} />
        ))}
      </div>
      <div
        className={`bg-white p-4 pb-16 min-w-[90%] mt-8 mb-16 mx-auto rounded`}
      >
        <div className="avatar w-[9%] lg:w-[4.5%] translate-y-[9rem] lg:translate-y-[2.8rem] lg:mr-24">
          <img src="images/image-juliusomo.png" alt="user avatar" />
        </div>
        <textarea
          className="w-full lg:max-w-[80%] lg:translate-x-12 pt-2 pb-8 px-4 border-2 rounded"
          ref={commentInputRef}
          placeholder="Add a comment..."
        />
        <button
          onClick={addComment}
          className="py-2 px-6 mt-3 mb-4 text-sm text-white bg-indigo-900 rounded-md float-right hover:opacity-80"
        >
          SEND
        </button>
      </div>
    </main>
  );
};

export default CommentsList;
