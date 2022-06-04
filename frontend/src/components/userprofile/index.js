//userprofile
// i need to git the user info from the databace using the userid from 
//the token

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setuserProfile, deleteuserProfile, updateuserProfile } from "../../redux/reducers/user";
const UserProfile = () => {

  // to see user profaile set from local stoge 
  const { userProfile, userId } = useSelector((state) => {
    return {
      // userid:state.auth.userid,
      userProfile: state.user.userProfile,
      userId: state.auth.userId,
    }
  });
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

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

  const updateUserById = () => {
    axios
      .put(`http://localhost:5000/user/${id}`,

        {
          id:id,
          firstName,
          lastName,
          phoneNumber,
          profileImage,

        })

      .then((result) => {
        console.log(result, "user profile");
        dispatch(updateuserProfile({
          id:id,
          firstName,
          lastName,
          phoneNumber,
          profileImage,

        }));

        setMessage("user with ID is redy to be updated");
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.message);
      });
  };
  const [isClicked, setIsClicked] = useState(false);


  useEffect(() => {
    getUserById();
  }, []);
  return (
    <div>
      {userProfile &&
        userProfile.map((user, i) => {
          return (
            <div>
              <div>
                <img className="userProfile" src={user.profileImage} />
              </div>
              <div className="datails-Container">
                <p>firstName   :{user.firstName}</p>
                <p>lastName    :{user.lastName}</p>
                <p>phoneNumber :{user.phoneNumber}</p>
              </div>
              <div>
                <button onClick={() => {
                  setIsClicked(true);
                  { setFirstName(user.firstName) };
                  { setLastName(user.lastName) };
                  { setPhoneNumber(user.phoneNumber) };
                  { setProfileImage(user.profileImage) };
                }}> update your info</button>
                {isClicked ? <div>
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
                    <input
                      defaultValue={profileImage}

                      type="text"
                      required="required"
                      onChange={(e) => setProfileImage(e.target.value)}
                    />
                    <span>profileImage</span>
                  </div>
                  <button onClick={() => {
                    updateUserById(id);
                    setIsClicked(false);
                  }}> update
                  </button>
                </div>
                  : ""}
              </div>
            </div>
          );
        })}
    </div>
  );


}

export default UserProfile;
