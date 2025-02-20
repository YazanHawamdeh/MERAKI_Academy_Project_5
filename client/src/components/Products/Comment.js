import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import { useSelector } from "react-redux";
import axios from "axios";
import "./Comment.css";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";

const Comment = ({ id }) => {
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });
  //===============================================================

  useEffect(() => {
    getComments();
  }, []);

  //===============================================================
  const { token, isLoggedIn } = state;
  const userName = localStorage.getItem("userName");

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  const createNewComment = async () => {
    const body = {
      comment,
    };
    const headers = {
      Authorization: `Bearer ${state.token}`,
    };
    await axios
      .post(`/productes/${id}/comments`, body, { headers })
      .then((res) => {
        if (res.data.success) {
          setStatus(true);

          setMessage(res.data.massege);
          getComments();
        }
      })
      .catch((err) => {
        setStatus(false);

        setMessage(err.response.data.massege);
      });
  };

  const getComments = async () => {
    await axios
      .get(`/productes/${id}/comments`)
      .then((res) => {
        if (res.data.success) {
          setStatus(true);
          setComments(res.data.comments);
          setMessage(res.data.massege);
        }
      })
      .catch((err) => {
        setStatus(false);

        setMessage(err.response.data.massege);
      });
  };

  const deleteComment = async (id) => {
    await axios
      .delete(`/productes/${id}/comments`)
      .then((res) => {
        if (res.data.success) {
          setStatus(true);

          getComments();

          setMessage(res.data.massege);
        }
      })
      .catch((err) => {
        setStatus(false);

        setMessage(err.response.data.massege);
      });
  };
  return (
    <>
      {isLoggedIn ? (
        <div className="writeComment-continar">
          <div className="writeComment">
            <input
              className="commentHere"
              placeholder="comment here"
              onChange={(e) => setComment(e.target.value)}
            />
            <HiOutlinePencilAlt
              size={35}
              className="addComment"
              onClick={createNewComment}
            />
          </div>
        </div>
      ) : (
        <h2>register to add a comment</h2>
      )}
      {comments.map((comment, index) => {
        return (
          <div>
            <div className="CommentDiv" key={index}>
              <div className="test4-continar">
                <div className="test4">
                  <div>
                    <h3 className="block">{comment.commenter}</h3>
                    <br />
                    <p className="block pComment">{comment.comment}</p>
                  </div>

                  {userName == comment.commenter ? (
                    <AiOutlineDelete
                      size={35}
                      className="delComment"
                      onClick={() =>
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            Swal.fire(
                              "Deleted!",
                              "Your file has been deleted.",
                              "success"
                            );
                            deleteComment(comment.id);
                          }
                        })
                      }
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Comment;
