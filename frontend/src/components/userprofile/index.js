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
import ProfileUnCompleteddOrders from "../PofileUnCompletedOrdedrs"; //chenage To Show All Orders ,
// import ProfileCompleteddOrders from "../ProfileCompletedOrders";
const UserProfile = () => {
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
  const [isOrderShow, setIsOrderShow] = useState(false);
  const getUserById = () => {
    axios
      .get(`https://infintyzone.herokuapp.com/user/${id}`)
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
  const [Address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState("");
  // const [newImg, setNewImg] = useState("");
  const updateUserById = () => {
    // let newImg =url || profileImage;
    axios
      .put(
        `https://infintyzone.herokuapp.com/user/${id}`,

        {
          id: id,
          firstName,
          lastName,
          phoneNumber,
          Address,
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
            Address,
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
      .delete(`https://infintyzone.herokuapp.com/user/${id}`, {
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
      {/* <div className="Header_Profile">
        <h2>Profile</h2>
      </div> */}
      <div
        className={
          id == userId ? "LeftContainer-Profile" : "LeftContainer-ProfileVisit"
        }
      >
        {userProfile &&
          userProfile.map((user, i) => {
            return (
              <>
                <div className="Container-INFO">
                  <div className="inner_container">
                    <div className="userProfileImg">
                      <img src={user.profileImage} />
                      <p className="nameInfo">
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                  </div>
                  {/* </div> asdasd*/}
                  <div className="datails-Container_profile">
                    <div className="line">
                      <label className="B">Email:</label>
                      <p>{user.email}</p>
                    </div>
                    <div className="line">
                      <label className="B">PhoneNumber:</label>
                      <p>{user.phoneNumber}</p>
                    </div>
                    <div className="line">
                        <label className="B">Adress:</label>
                        <p>{user.Address}</p>
                    </div>
                    
                    <div className="line">
                        <label className="B">Joined At:</label>
                        <p>{user.joinedDate.substring(0, 10)}</p>
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
                          {
                            setAddress(user.Address);
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
                        <div>
                          <div className="inputbox">
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
                              defaultValue={Address}
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

                            <div className="cloud">
                              {" "}
                              <Cloud
                                setProfileImage={setProfileImage}
                                url={url}
                                setUrl={setUrl}
                              />
                            </div>
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
      </div>
    </>
  );
};

export default UserProfile;
