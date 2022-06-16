// in this componant i need to reander all the user info,,
import "./style.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setuserProfile } from "../../redux/reducers/user";
import axios from "axios";
import { deleteuser } from "../../redux/reducers/admin";
import AdminPanelUserOrderContainer from "../AdminPanelUserOrderContainer";
import { RiDeleteBin5Line } from "react-icons/ri";
const UserProfilePanel = () => {
  const [isUserInfo, setIsUserInfo] = useState(true);
  const [isOrdersSection, setOrdersSection] = useState(false);
  const [isCommentsSection, setIsCommentsSection] = useState(false);

  const navigate = useNavigate();
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
      .delete(`https://infintyzone.herokuapp.com/admin/delete_user/${id}`)
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

  const UserInfoComponent = () => {
    return (
      <div className="UsersInControlPanelMain">
        {userProfile &&
          userProfile.map((element) => {
            return (
              <div className="user_Line">
                <div className="user_info">  
                <div>
                  <img className="userProfile" src={element.profileImage} />
                </div> 
                <p className="headerUser">Client Info</p> 
                <div className="infoWritten">
               
                <div >
                 Name : {`${element.firstName} ` + ` ${element.lastName}`} </div>
              
                <div>  Phone Number :{element.phoneNumber}</div>
                <div>  Email :{element.email}</div>
                <div>  Address :{element.address}</div>
                  <div className="buttonsForOneUser">
                <button className="deleteUserBtnAdmin"
                  onClick={() => {
                    userDelete(element.id);
                  }}
                >
                  <RiDeleteBin5Line/>
                </button>
               
               
                </div>
                 </div>  </div>
               
              </div>
            );
          })}
      </div>
    );
  };

  const getAllUsers = () => {
    axios
      .get(`https://infintyzone.herokuapp.com/user/${id}`)
      .then((result) => {
        dispatch(setuserProfile(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="Center-Container-OneUserInAdmin">
      <div className="Btns-InUser">
        <span
          onClick={() => {
            setIsUserInfo(true);
            setOrdersSection(false);
            setIsCommentsSection(false);
          }}
        >
          User Info
        </span>
        <span
          onClick={() => {
            setIsUserInfo(false);
            setOrdersSection(true);
            setIsCommentsSection(false);
          }}
        >
          Orders
        </span>

      </div>
      {isUserInfo ? <UserInfoComponent /> : ""}
      {isOrdersSection ? <AdminPanelUserOrderContainer /> : ""}
    </div>
  );
};

export default UserProfilePanel;
