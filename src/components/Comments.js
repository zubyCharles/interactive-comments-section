import React, { useEffect, useReducer, useRef, useState } from 'react';
import Reply from './Replies';
import { replyReducer as reducer } from '../utils/reducer';
import data from '../data/comments.json';
import icons from '../icons';

const { currentUser } = data;

//This returns the comments rendered by the comments section
const Comment = ({ commentObject }) => {
  const { user } = commentObject;

  const inputRef = useRef();
  const [showInput, setInput] = useState(false);
  const [replies, dispatch] = useReducer(reducer, commentObject.replies);
  const [likesCount, setLikesCount] = useState(commentObject.score);
  const [liked, setLiked] = useState(commentObject.liked);

  const sendReply = () => {
    if (inputRef.current.value.match(/^$/)) {
      return;
    }
    dispatch({
      type: 'add',
      id: replies.length + 1,
      username: currentUser.username,
      content: inputRef.current.value,
      liked: false,
      score: 0,
      replyingTo: commentObject.user.username,
      user: { image: { png: currentUser.image.png } },
    });
    inputRef.current.value = '';
    setInput(!showInput);
  };

  /*
  useEffect(() => {
    const likes = JSON.parse(localStorage.getItem('likes'));
    if (likes) {
      setLikesCount(likes);
    }
  }, []);
  */

  /*
  useEffect(() => {
    localStorage.setItem('likes', JSON.stringify(likesCount));
  }, [likesCount]);*/

  //useEffect(() => console.log(replies), [replies, dispatch]);

  return (
    <div>
      <div className="bg-white relative w-11/12 py-2 my-2 mx-auto rounded-lg">
        <div className="header p-2 flex flex-row content-center">
          <span className="px-2">
            <img className="w-8" src={user.image.png} alt="avatar" />
          </span>
          <span className="font-bold px-2">{user.username}</span>
          {user.username === currentUser.username ? (
            <span className="bg-indigo-900 text-white text-xs text-center self-center px-2 pb-1 rounded-sm">
              you
            </span>
          ) : null}
          <span className="text-slate-700 px-2">{commentObject.createdAt}</span>
        </div>
        <div className="comment-body w-11/12 mx-auto">
          <p className="text-slate-700">{commentObject.content}</p>
        </div>
        <div className="bottom-btns flex px-4 py-6 justify-between">
          <div className="upvotes bg-slate-100 w-fit p-2 flex items-center mx-0 my-0 rounded-lg">
            <span
              className="plus pr-4"
              onClick={
                liked
                  ? null
                  : () => {
                      setLikesCount((likesCount) => likesCount + 1);
                      setLiked(true);
                      localStorage.setItem('likes', JSON.stringify(likesCount));
                    }
              }
            >
              <img src={icons.Plus} alt="" />
            </span>
            <span
              className={`score ${
                liked ? 'text-indigo-900 font-extrabold' : null
              } px-2`}
            >
              {likesCount}
            </span>
            <span
              className="minus pl-4"
              onClick={
                liked
                  ? () => {
                      setLikesCount((likesCount) => likesCount - 1);
                      setLiked(false);
                      localStorage.setItem('likes', JSON.stringify(likesCount));
                    }
                  : null
              }
            >
              <img src={icons.Minus} alt="" />
            </span>
          </div>
          <div
            className="reply flex items-center top-0 right-0 mt-0 cursor-pointer"
            onClick={() => setInput(!showInput)}
          >
            <span className="icon px-1">
              <img src={icons.Reply} alt="" />
            </span>
            <span className="text-indigo-900 font-semibold px-1">Reply</span>
          </div>
        </div>
        <div
          className={`${
            showInput ? 'block' : 'hidden'
          } input w-11/12 mt-8 mb-16 mx-auto`}
        >
          <textarea
            className="w-full pt-2 pb-8 px-4 border-2"
            ref={inputRef}
            type="text"
          />
          <button
            onClick={sendReply}
            className="py-2 px-6 mt-3 mb-4 text-sm text-white bg-indigo-900 rounded-md float-right hover:opacity-50"
          >
            SEND
          </button>
        </div>
      </div>

      <div className="replies w-11/12 flex flex-col items-end pl-4 border-l-slate-300 border-l-2 mx-auto">
        {replies.map((reply, index) => (
          <Reply
            key={reply.id}
            reply={reply}
            index={index}
            dispatch={dispatch}
          />
        ))}
      </div>
    </div>
  );
};

export default Comment;
