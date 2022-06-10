//userprofile
// i need to git the user info from the databace using the userid from
//the token

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Cloud from "../Cloud";
import Modal from "react-modal";
import "./style.css";
import {
  setuserProfile,
  deleteuserProfile,
  updateuserProfile,
} from "../../redux/reducers/user";
const UserProfile = () => {
  // to see user profaile set from local stoge
  const { userProfile, userId } = useSelector((state) => {
    return {
      // userid:state.auth.userid,
      userProfile: state.user.userProfile,
      userId: state.auth.userId,
    };
  });
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const getUserById = () => {
    axios
      .get(`http://localhost:5000/user/${id}`)
      .then((result) => {
        console.log(result, "user profile");
        dispatch(setuserProfile(result.data.result));
        setMessage("user with ID");
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.message);
      });
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profileImage, setProfileImage] = useState("");
  // const [newImg, setNewImg] = useState("");
  const updateUserById = () => {
    let newImg = url || profileImage;
    axios
      .put(
        `http://localhost:5000/user/${id}`,

        {
          id: id,
          firstName,
          lastName,
          phoneNumber,
          profileImage: newImg,
        }
      )

      .then((result) => {
        console.log(url, "urllllllll");
        console.log(result, "user profile");
        dispatch(
          updateuserProfile({
            id: id,
            firstName,
            lastName,
            phoneNumber,
            profileImage: newImg,
          })
        );

        setMessage("user with ID is ready to be updated");
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.message);
      });
  };
  const [isClicked, setIsClicked] = useState(false);

  const DeletUserById = () => {
    axios
      .delete(`http://localhost:5000/user/${id}`, {
        id: id,
      })
      .then((result) => {
        console.log(result, "user profile");
        dispatch(
          deleteuserProfile({
            id: id,
          })
        );
        setMessage("user with ID is Deleted");
        navigate("/register");
        localStorage.clear();
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.message);
      });
  };

  useEffect(() => {
    getUserById();
  }, []);
  return (
    <div className="big_container">
      {userProfile &&
        userProfile.map((user, i) => {
          return (
            <>
              <div className="sec_container">
                <div className="inner_container">
                  <div className="userProfileImg">
                    <img src={user.profileImage} />
                    <p className="nameInfo">
                      {user.firstName} {user.lastName}
                    </p>
                  </div>
                  <div>
                    <button
                      className="updateButton"
                      onClick={() => {
                        setIsOpen(true);
                        // setTimeout(() => {
                        //   setIsOpen(false);
                        // }, 2000);
                        setIsClicked(true);
                        {
                          setFirstName(user.firstName);
                        }
                        {
                          setLastName(user.lastName);
                        }
                        {
                          setPhoneNumber(user.phoneNumber);
                        }
                        {
                          setProfileImage(user.profileImage);
                        }
                      }}
                    >
                      {" "}
                      Update your info
                    </button>
                    <button
                      className="deleteButton"
                      onClick={() => {
                        DeletUserById(id);
                        setMessage("user has been deleted");
                      }}
                    >
                      Delete your Account
                    </button>
                  </div>
                </div>
                <div className="datails-Container_profile">
                  <div className="line">
                    <div className="Di">
                      <span>FirstName:</span>
                    </div>
                    <div className="inLine">
                      <span>{user.firstName}</span>
                    </div>
                  </div>
                  <div className="line">
                    <div className="Di">
                      <span>LastName:</span>
                    </div>
                    <div className="inLine">
                      <span>{user.lastName}</span>
                    </div>
                  </div>
                  <div className="line">
                    <div className="Di">
                      <span>Email:</span>
                    </div>
                    <div className="inLine">
                      <span>{user.email}</span>
                    </div>{" "}
                  </div>
                  <div className="line">
                    <div className="Di">
                      <span>PhoneNumber:</span>
                    </div>{" "}
                    <div className="inLine">
                      <span>{user.phoneNumber}</span>
                    </div>{" "}
                  </div>
                </div>
              </div>
              
              <Modal
                ariaHideApp={false}
                className={"popUp1"}
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
              >
                <div className="popUpContainer">
                <div>
                {isClicked ? (
                  <div>
                    <div className="inputbox">
                      <input className="firstName1"
                      placeholder="firstName"
                        defaultValue={firstName}
                        type="text"
                        required="required"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    
                    </div>
                    <div className="inputbox">
                      <input className="firstName1"
                         placeholder="lastName"
                        defaultValue={lastName}
                        type="text"
                        required="required"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    
                    </div>
                    <div className="inputbox">
                      <input className="firstName1"
                       placeholder="phoneNumber"
                        defaultValue={phoneNumber}
                        type="text"
                        required="required"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                     
                    </div>
                    <div className="inputbox">
                      {/* <input
                        defaultValue={profileImage}
                        type="text"
                        required="required"
                        onChange={(e) => setProfileImage(e.target.value)}
                      />
                      <span>profileImage</span> */}
                      <Cloud   className="cloud"
                        setProfileImage={setProfileImage}
                        url={url}
                        setUrl={setUrl}
                      />
                    </div>
                    <button className="UpdateProfileButton"
                      onClick={() => {
                        updateUserById(id);
                        setIsClicked(false);
                        setIsOpen(false);
                        
                      }}
                    >
                      {" "}
                      update
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
                </div>
              </Modal>
            </>
          );
        })}
    </div>
  );
};

export default UserProfile;
