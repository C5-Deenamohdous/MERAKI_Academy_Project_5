import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Modal from "react-modal";
import {
  setComment,
  deleteComments,
  updateComments,
  addComments,
} from "../../redux/reducers/comments";
import { useNavigate, useParams } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";

const Comment = ({ id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { comment, token, userId } = useSelector((state) => {
    return {
      comment: state.comment.comment,
      token: state.auth.token,
      userId: state.auth.userId,
    };
  });
  const [message, setMessage] = useState("");
  const [newComment, setNewComment] = useState("");
  const [addComment, setAddComment] = useState("");
  const [profileImg1, setProfileImg1] = useState("");
  // const [click, setClick] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const getCommentById = () => {
    axios
      .get(`https://infintyzone.herokuapp.com/comment/${id}`)
      .then((result) => {
        console.log(result, "**!!!!!!!**all comments ");
        dispatch(setComment(result.data.result));
        setMessage("All Comments");
        // setProfileImg1(result.)
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.message);
      });
  };
  const deleteComment = (commentId) => {
    console.log(commentId, "PPPPPPPPPpP");
    axios
      .delete(`https://infintyzone.herokuapp.com/comment/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(deleteComments(commentId));
        setMessage(" Comment is deleted");
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.message);
      });
  };
  const updateComment = (commentId) => {
    axios
      .put(
        `https://infintyzone.herokuapp.com/comment/${commentId}`,
        {
          comment: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log(result, "ooooooooo");
        dispatch(
          updateComments({
            commentId: commentId,
            comment: newComment,
            user_id: userId,
          })
        );
        // setMessage(" Comment is updated");
        setIsOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.message);
      });
  };
  const createComment = () => {
    axios
      .post(
        `https://infintyzone.herokuapp.com/comment/${id}`,
        {
          comment: addComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log(result, "oooooooooo");
        dispatch(
          addComments({
            comment: addComment,
            id: result.data.insertId,
            firstName: result.data.result[0].firstName,
            lastName: result.data.result[0].lastName,
            profileImage: result.data.result[0].profileImage,
            user_id: userId,
          })
        );
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };
  useEffect(() => {
    getCommentById();
  }, [id]);
  console.log(comment, "{{{{{{{");

  return (
    <div className="comments-Container">
      <div className="row-Container1">
        <input
          className="inputComment"
          type={"textArea"}
          placeholder="write yor comment..."
          onChange={(e) => {
            setAddComment(e.target.value);
          }}
        />
        <button
          className="addButton"
          onClick={() => {
            createComment();
          }}
        >
          Add Comment
        </button>
      </div>
      {comment &&
        comment.map((comment, i) => {
          return (
            <div key={i} className="oneComment">
              <img className="publisherImg" src={comment.profileImage} />

              <div className="Container">
                <div className="displayName">
                  <p>
                    {comment.firstName} {comment.lastName} :{" "}
                  </p>
                </div>
                <div className="commentBody">
                  <p>{comment.comment}</p>
                </div>
              </div>

              {userId == comment.user_id ? (
                <div className="deleteUpdateButton">
                  <p
                    className="deleteIcon"
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                    <RiDeleteBin6Line />
                  </p>

                  <p
                    className="updateIcon"
                    onClick={() => {
                      setIsOpen(true);
                    }}
                  >
                    <BiEdit />
                  </p>

                  <Modal
                    ariaHideApp={false}
                    className={"CommentUpdatePopUp"}
                    isOpen={isOpen}
                    onRequestClose={() => setIsOpen(false)}
                  >
                    <div className="CONTAINER-Comment">
                      <input
                        defaultValue={comment.comment}
                        onChange={(e) => {
                          setNewComment(e.target.value);
                        }}
                      />
                      <div className="BTN">
                        <span
                          className="Upd"
                          onClick={() => {
                            updateComment(comment.id);
                          }}
                        >
                          Update
                        </span>
                        <span
                          className="Cancel"
                          onClick={() => {
                            setIsOpen(false);
                          }}
                        >
                          Cancel
                        </span>
                      </div>
                    </div>
                  </Modal>
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
    </div>
  );
};
export default Comment;
