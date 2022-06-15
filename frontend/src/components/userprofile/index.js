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
import user, {
  setuserProfile,
  deleteuserProfile,
  updateuserProfile,
} from "../../redux/reducers/user";
import ProfileUnCompleteddOrders from "../PofileUnCompletedOrdedrs";
import ProfileCompleteddOrders from "../ProfileCompletedOrders";
const UserProfile = () => {
  // to see user profaile set from local stoge
  const { userProfile, userId } = useSelector((state) => {
    return {
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
  const [isUnCompleteOrder, serIsUnCompleteOrder] = useState(true);
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
  const [address, setAddress] = useState("")
  const [profileImage, setProfileImage] = useState("");
  // const [newImg, setNewImg] = useState("");
  const updateUserById = () => {
    // let newImg =url || profileImage;
    axios
      .put(
        `http://localhost:5000/user/${id}`,

        {
          id: id,
          firstName,
          lastName,
          phoneNumber,
          profileImage: url || profileImage,
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
            profileImage: url || profileImage,
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
    <>
      <div className="Header_Profile">
        <h2>Profile</h2>
      </div>
      {/* <div className="big_container"> */}
{/* LeftContainer-Profile */}
      <div className={id == userId ? "LeftContainer-Profile" : "LeftContainer-ProfileVisit"}>
        {userProfile &&
          userProfile.map((user, i) => {
            return (
              <>
                <div className="Container-INFO">
                  {/* <div className="sec_container"> */}
                  <div className="inner_container">
                    <div className="userProfileImg">
                      <img src={user.profileImage} />
                      <p className="nameInfo">
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                  </div>
                  {/* </div> */}
                  <div className="datails-Container_profile">
                    <div className="line">
                      <div className="Di">
                        <span>Adress:</span>
                      </div>
                      <div className="inLine">
                        <span>Adress Test</span>
                      </div>
                    </div>
                    <div className="line">
                      <div className="Di">
                        <span>Joined At:</span>
                      </div>
                      <div className="inLine">
                        <span>{user.joinedDate.substring(0, 10)}</span>
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
                  {user.id == userId ? (
                    <div className="ProfileBtns">
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
                  ) : (
                    ""
                  )}
                </div>
                <Modal
                  ariaHideApp={false}
                  className={"popUp1"}
                  isOpen={isOpen}
                  onRequestClose={() => setIsOpen(false)}
                >
                  <div className="popUpUserprofiler">
                    <div>
                      {isClicked ? (
                        <div >
                          <div  className="inputbox">
                            <input
                              className="firstName1"
                              placeholder="firstName"
                              defaultValue={firstName}
                              type="text"
                              required="required"
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </div>
                          <div className="inputbox">
                            <input
                              className="firstName1"
                              placeholder="lastName"
                              defaultValue={lastName}
                              type="text"
                              required="required"
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </div>
                          <div className="inputbox">
                            <input
                              className="firstName1"
                              placeholder="phoneNumber"
                              defaultValue={phoneNumber}
                              type="text"
                              required="required"
                              onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                          </div>
                          <div className="inputbox">
                            <input
                              className="firstName1"
                              placeholder="Address"
                              defaultValue={address}
                              type="text"
                              required="required"
                              onChange={(e) => setAddress(e.target.value)}
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

                          <div   className="cloud">  <Cloud
                            
                              setProfileImage={setProfileImage}
                              url={url}
                              setUrl={setUrl}
                            /></div>
                          </div>
                          <button
                            className="UpdateProfileButton"
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
        {id == userId ? (
          <div className="profileOrder ">
            <div>
              <h2>My Orders</h2>
            </div>
            <div className="BtnsProfileOrder">
              <span
                onClick={() => {
                  serIsUnCompleteOrder(false);
                }}
              >
                Completed
              </span>
              <span
                onClick={() => {
                  serIsUnCompleteOrder(true);
                }}
              >
                UnCompleted
              </span>
            </div>
            {isUnCompleteOrder ? (
              <ProfileUnCompleteddOrders />
            ) : (
              <ProfileCompleteddOrders />
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      {/* </div> */}
    </>
  );
};

export default UserProfile;
