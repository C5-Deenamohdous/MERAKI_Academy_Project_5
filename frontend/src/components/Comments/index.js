import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
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
  const { comment, token ,userId } = useSelector((state) => {
    return {
      comment: state.comment.comment,
      token: state.auth.token,
      userId:state.auth.userId
    };
  });
  const [message, setMessage] = useState("");
  const [newComment, setNewComment] = useState("");
  const [addComment, setAddComment] = useState("");
  const [profileImg1, setProfileImg1] = useState("")
  const [click, setClick] = useState(false);
  const getCommentById = () => {
    axios
      .get(`http://localhost:5000/comment/${id}`)
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
      .delete(`http://localhost:5000/comment/${commentId}`, {
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
        `http://localhost:5000/comment/${commentId}`,
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
        dispatch(updateComments({ commentId: commentId, comment: newComment , user_id: userId
         }));
        setMessage(" Comment is updated");
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.message);
      });
  };
  const createComment = () => {
   
    axios
      .post(
        `http://localhost:5000/comment/${id}`,
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
            user_id: userId
          })
        );
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };
  useEffect(() => {
    getCommentById();
  }, []);
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
              <img className="publisherImg" src={comment.profileImage}/>

              <div className="Container">
                <div className="displayName">
                  <p>
                    {comment.firstName} {comment.lastName} : </p>

                       
                 
                </div>
                <div className="commentBody">
                  <p>{comment.comment}</p>
                </div>
              </div>

              {userId ==comment.user_id ? 
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
                      updateComment(comment.id);
                      setClick(true);
                    }}
                  >
                    <BiEdit />
                  </p>
              
{click ? <input
                  defaultValue={comment.comment}
                  onChange={(e) => {
                    setNewComment(e.target.value);
                    
                  }} 
                />: ""}
                
              </div>:""}
              
            </div>
          );
        })}
    </div>
  );
};
export default Comment;
