import React, { useRef, useState } from 'react';
import icons from '../icons';
import data from '../data/comments.json';

const { currentUser } = data;

//This returns the replies to the comments
const Reply = ({ reply, dispatch, index }) => {
  const replyInputRef = useRef();
  const editInputRef = useRef();

  const [showReplyInput, setReplyInput] = useState(false);
  const [showEditInput, setEditInput] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [likesCount, setLikesCount] = useState(reply.score);
  const [liked, setLiked] = useState(reply.liked);

  const sendReply = () => {
    if (replyInputRef.current.value.match(/^$/)) {
      return;
    }
    dispatch({
      type: 'add',
      username: currentUser.username,
      content: replyInputRef.current.value,
      liked: false,
      score: 0,
      replyingTo: reply.username,
      user: { image: { png: currentUser.image.png } },
    });
    replyInputRef.current.value = '';
    setReplyInput(!showReplyInput);
  };

  const updateReply = (index) => {
    dispatch({ type: 'update', content: editInputRef.current.value, index });
    setEditInput(!showEditInput);
  };

  const deleteReply = (index) => {
    dispatch({ type: 'delete', index });
    setDeleteModal(false);
  };

  return (
    <div key={reply.id} className="reply bg-white w-full p-4 my-1 rounded-lg">
      <div
        className={`overlay ${
          showDeleteModal || showEditInput ? 'block' : 'hidden'
        } fixed z-40 w-screen h-screen top-0 left-0 bg-slate-800 opacity-30`}
      ></div>
      <div className="header p-2 pl-0 flex flex-row content-center">
        <span className="pr-2">
          <img className="w-8" src={reply.user.image.png} alt="avatar" />
        </span>
        <span className="font-bold px-2 self-center">{reply.username}</span>
        {reply.username === currentUser.username ? (
          <span className="bg-indigo-900 text-white text-xs text-center self-center px-2 pb-1 rounded-sm">
            you
          </span>
        ) : null}
        <span className="text-slate-600 px-2 self-center">{`now`}</span>
      </div>
      <p className="text-slate-600">
        <span className="text-indigo-900 font-semibold">{`@${reply.replyingTo}`}</span>{' '}
        {reply.content}
      </p>
      <div className="bottom-btns w-full flex justify-between my-1 mt-6 mx-auto">
        <div className="upvotes bg-slate-100 w-fit p-2 flex items-center mx-0 mt-0 rounded-lg">
          <span
            className="plus pr-3"
            onClick={
              liked
                ? null
                : () => {
                    setLikesCount((likesCount) => likesCount + 1);
                    setLiked(true);
                  }
            }
          >
            <img src={icons.Plus} alt="" />
          </span>
          <span
            className={`score px-1 ${
              liked ? 'text-indigo-900 font-extrabold' : null
            }`}
          >
            {likesCount}
          </span>
          <span
            className="minus pl-3"
            onClick={
              liked
                ? () => {
                    setLikesCount((likesCount) => likesCount - 1);
                    setLiked(false);
                  }
                : null
            }
          >
            <img src={icons.Minus} alt="" />
          </span>
        </div>
        {reply.username === currentUser.username ? (
          <>
            <div className="delete-edit flex">
              <button
                className="flex items-center mx-3"
                onClick={() => setDeleteModal(true)}
              >
                <img className="pr-2" src={icons.Delete} alt="" />
                <span className="text-red-500 text-lg font-semibold">
                  Delete
                </span>
              </button>
              <button
                className="flex items-center mx-3"
                onClick={() => setEditInput(!showEditInput)}
              >
                <img className="pr-2" src={icons.Edit} alt="" />
                <span className="text-indigo-900 text-lg font-semibold">
                  Edit
                </span>
              </button>
            </div>

            {/*Input field for editing replies */}
            <div
              className={`edit-input fixed ${
                showEditInput ? 'block' : 'hidden'
              } z-50 top-1/3 left-4 w-11/12 my-0`}
            >
              <textarea
                rows="3"
                className="w-full  bg-white text-xl pt-2 pb-8 px-4 mx-auto border-3 leading-8 rounded-lg outline-none"
                ref={editInputRef}
                defaultValue={reply.content}
                type="text"
              />
              <button
                onClick={() => setEditInput(!showEditInput)}
                className="py-2 px-6 mt-3 mb-4 text-base font-medium text-white bg-slate-500 rounded-md "
              >
                CANCEL
              </button>
              <button
                onClick={() => updateReply(index)}
                className="absolute right-0 py-2 px-6 mt-3 mb-4 text-base font-medium text-white bg-indigo-900 rounded-md "
              >
                UPDATE
              </button>
            </div>

            <div
              className={`delete-modal ${
                showDeleteModal ? 'block' : 'hidden'
              } bg-white fixed z-50 top-1/4 left-4 w-11/12 my-0 rounded-lg`}
            >
              <div className="modal-inner p-4 pt-8">
                <h1 className="text-2xl font-semibold text-slate-700">
                  Delete comment
                </h1>
                <p className="text-slate-500 text-lg font-normal pt-4 pb-8">
                  Are you sure you want to delete this comment? This will remove
                  the comment and can't be undone.
                </p>
                <div className="buttons w-full flex justify-between">
                  <button
                    className="text-white bg-slate-500 text-base font-bold py-3 px-6 rounded-lg"
                    onClick={() => setDeleteModal(false)}
                  >
                    NO, CANCEL
                  </button>
                  <button
                    className="text-white bg-red-500 text-base font-bold py-3 px-6 rounded-lg"
                    onClick={() => {
                      deleteReply(index);
                    }}
                  >
                    YES, DELETE
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>
            <button
              className="flex items-center mx-3"
              onClick={() => setReplyInput(!showReplyInput)}
            >
              <img className="pr-2" src={icons.Reply} alt="" />
              <span className="text-indigo-900 text-lg font-semibold">
                Reply
              </span>
            </button>
          </div>
        )}
      </div>

      {/**Input field for adding replies */}
      <div
        className={`reply-input ${
          showReplyInput ? 'block' : 'hidden'
        } input w-11/12 mt-8 mb-16 mx-auto`}
      >
        <textarea
          className="w-full pt-2 pb-8 px-4 border-2"
          ref={replyInputRef}
          type="text"
        />
        <button
          onClick={sendReply}
          className="py-2 px-6 mt-3 mb-4 text-sm text-white bg-indigo-900 rounded-md float-right"
        >
          SEND
        </button>
      </div>
    </div>
  );
};

export default Reply;
