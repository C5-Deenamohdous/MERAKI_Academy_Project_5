// in this componant i need to reander all the user info,,
import "./style.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setuserProfile } from "../../redux/reducers/user";
import axios from "axios";
import { deleteuser } from "../../redux/reducers/admin";
import AdminPanelUserOrderContainer from "../AdminPanelUserOrderContainer";

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

  const UserInfoComponent = () => {
    return (
      <div className="UsersInControlPanel">
        {userProfile &&
          userProfile.map((element) => {
            return (
              <div>
                <div>
                  User Name : {`${element.firstName} ` + ` ${element.lastName}`}
                </div>
                <div> User phone Number :{element.phoneNumber}</div>
                <div> User email :{element.email}</div>
                <div>
                  <img className="userProfile" src={element.profileImage} />
                </div>
                <button
                  onClick={() => {
                    userDelete(element.id);
                  }}
                >
                  Delete User
                </button>
                <div> ----------------------</div>
                <button
                  onClick={() => {
                    navigate(`/admin/user_orders/${element.id}`);
                  }}
                >
                  User Orders
                </button>
              </div>
            );
          })}
      </div>
    );
  };

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
    <div className="Center-Container">
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
        <span
          onClick={() => {
            setIsUserInfo(false);
            setOrdersSection(false);
            setIsCommentsSection(true);
          }}
        >
          Comments
        </span>
      </div>
      {isUserInfo ? <UserInfoComponent /> : ""}
      {isOrdersSection ? <AdminPanelUserOrderContainer /> : ""}
      {isCommentsSection ? "Commeeeent" : ""}
    </div>
  );
};

export default UserProfilePanel;
