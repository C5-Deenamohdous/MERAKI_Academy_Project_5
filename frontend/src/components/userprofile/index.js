//userprofile
// i need to git the user info from the databace using the userid from
//the token

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Cloud from "../Cloud";
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
                  <span className="line">
                    FirstName :{" "}
                    <span className="lineINLine"> {user.firstName}</span>
                  </span>
                  <span className="line">
                    LastName :{" "}
                    <span className="lineINLine"> {user.lastName}</span>
                  </span>
                  <span className="line">
                    Email : <span className="lineINLine"> {user.email}</span>
                  </span>
                  <span className="line">
                    phoneNumber :{" "}
                    <span className="lineINLine"> {user.phoneNumber}</span>
                  </span>
                </div>
              </div>
              <div>
                <br />

                {isClicked ? (
                  <div>
                    <div className="inputbox">
                      <input
                        defaultValue={firstName}
                        type="text"
                        required="required"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <span>firstName</span>
                    </div>
                    <div className="inputbox">
                      <input
                        defaultValue={lastName}
                        type="text"
                        required="required"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                      <span>lastName</span>
                    </div>
                    <div className="inputbox">
                      <input
                        defaultValue={phoneNumber}
                        type="text"
                        required="required"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                      <span>phoneNumber</span>
                    </div>
                    <div className="inputbox">
                      {/* <input
                        defaultValue={profileImage}
                        type="text"
                        required="required"
                        onChange={(e) => setProfileImage(e.target.value)}
                      />
                      <span>profileImage</span> */}
                      <Cloud
                        setProfileImage={setProfileImage}
                        url={url}
                        setUrl={setUrl}
                      />
                    </div>
                    <button
                      onClick={() => {
                        updateUserById(id);
                        setIsClicked(false);
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
            </>
          );
        })}
    </div>
  );
};

export default UserProfile;
