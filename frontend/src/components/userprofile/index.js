//userprofile
// i need to git the user info from the databace using the userid from 
//the token

import React, {useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setuserProfile,deleteuserProfile,updateuserProfile } from "../../redux/reducers/user";

//put // http://localhost:5000/user/6
// get("/:id", getUserById);
// get("/users", getAllusers);
// delete("/:id", deleteUserById); 
// put("/:id", updateUserById); 


const UserProfile = ()=>{

// to see user profaile set from local stoge 
//  
  const { userProfile } =useSelector((state) => {
    return {
      // userid:state.auth.userid,
      userProfile:state.user.userProfile,
    }});
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");

    const getUserById = () => {
        axios
          .get(`http://localhost:5000/user/6`)
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
      const updateUserById = () => {
        axios
          .put(`http://localhost:5000/user/6`)
          .then((result) => {
            console.log(result, "user profile");
            dispatch(updateuserProfile(result.data.result));
            setMessage("user with ID is redy to be updated");
          })
          .catch((err) => {
            console.log(err);
            setMessage(err.response.data.message);
          });
      };

      useEffect(() => {
        getUserById(id);
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
                    <p>firstName : {user.firstName}</p>
                    <p>lastName : {user.lastName}</p>
                    <p>phoneNumber : {user.phoneNumber}</p>
                  </div>
                </div>
              );
            })}
        </div>
      );


}

export default UserProfile;
