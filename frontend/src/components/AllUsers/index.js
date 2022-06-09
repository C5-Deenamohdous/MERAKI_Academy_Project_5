import "./style.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { deleteuser } from "../../redux/reducers/admin";
import { setAllUsers } from "../../redux/reducers/admin";

import { useNavigate, useParams } from "react-router-dom";

const UsersControlPanel = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => {
    return {
      allUsers: state.admin.allUsers,
    };
  });
  const getAllUsers = () => {
    axios
      .get("http://localhost:5000/admin/users")
      .then((result) => {
        dispatch(setAllUsers(result.data.result));
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div className="Center-Container">
      <div className="UsersInControlPanel">
        {allUsers &&
          allUsers.map((element,i) => {
            return (
              <div
                onClick={() => {
                  navigate(`/admin/user/${element.id}`);
                }}
              >
                <div>
                <span>{i+1}  </span>
                  User Name : {`${element.firstName} ` + ` ${element.lastName}`}
                </div>
                <div> User email :{element.email}</div>
                <div> ----------------------</div>
              </div>
              
            );
          })}
      </div>
    </div>
  );
};

export default UsersControlPanel;
