import "./style.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { deleteuser } from "../../redux/reducers/admin";
import { setAllUsers } from "../../redux/reducers/admin";
import { ImUsers } from "react-icons/im";
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
    <div className="Center-Container_Users ">
      <div className="clientsBar">
        {" "}
        <p>
          {" "}
          <ImUsers /> Clients
        </p>
      </div>
      <div className="UsersInControlPanel">
        <div className="details-users_row">
          <p className="table">#</p>
          <p className="table">profile Image</p>
          <p className="table">User Name </p>
          <p className="table">User email </p>
          <p className="table">Address</p>
        </div>
        {allUsers &&
          allUsers.map((element, i) => {
            return (
              <div
                className="details-users_row"
                onClick={() => {
                  navigate(`/admin/user/${element.id}`);
                }}
              >
                {/* <div className="details-Users"> */}
                  <div className="table" >
                    <p >{i + 1} </p>
                  </div>
                  <div className="table">
                   
                    <img  src={element.profileImage} />
                  </div>
                  <div  className="table">
                 
                    <span> {`${element.firstName} ` + ` ${element.lastName}`}</span>
                  </div>
                  <div className="table"><span>{element.email}</span> </div>
                </div>
              // </div>
            );
          })}
      </div>
    </div>
  );
};

export default UsersControlPanel;
