import "./style.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { deleteuser } from "../../redux/reducers/admin";
import { setAllUsers } from "../../redux/reducers/admin";
const UsersControlPanel = () => {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => {
    return {
      allUsers: state.admin.allUsers,
    };
  });
  const userDelete = (userId) => {
    axios
      .delete(`http://localhost:5000/admin/delete_user/${userId}`)
      .then((result) => {
        dispatch(deleteuser(userId));
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
      .get("http://localhost:5000/admin/users")
      .then((result) => {
        console.log(result);
        dispatch(setAllUsers(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="UsersInControlPanel">
      {allUsers &&
        allUsers.map((element) => {
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
            </div>
          );
        })}
    </div>
  );
};

export default UsersControlPanel;
