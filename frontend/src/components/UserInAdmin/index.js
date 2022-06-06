// in this componant i need to reander all the user info
//when the admin chose a user all the user info will 
//be reanderd 
import "./style.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {setuserProfile,} from "../../redux/reducers/user";
import axios from "axios";
import { deleteuser } from "../../redux/reducers/admin";
const UserProfilePanel = () => {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => {
    return {
      // userid:state.auth.userid,
      userProfile: state.user.userProfile,
    };
  });
  const { id } = useParams();
  const userDelete = () => {
    axios
      .delete(`http://localhost:5000/admin/delete_user/${id}`)
      .then((result) => {
        dispatch(deleteuser());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  const getAllUsers = () => {
    axios
      .get(`http://localhost:5000/user/${id}`)
      .then((result) => {
        dispatch(setuserProfile(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="UsersInControlPanel">
      {userProfile &&
        userProfile.map((element) => {
          return (
            <div>
              <div>User Name : {`${element.firstName} `+` ${element.lastName}`}</div>
              <div> User phone Number :{element.phoneNumber}</div>
              <div> User email :{element.email}</div>
             <div> <img className="userProfile" src={element.profileImage} /></div>
              <button  onClick={() => {
                    userDelete(element.id);
                  }}
                >  Delete User
                </button>
              <div> ----------------------</div>
              {/* <button></button> */}
            </div>
          );
        })}
    </div>
  );
};
export default UserProfilePanel;
