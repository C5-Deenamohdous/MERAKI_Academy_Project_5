import "./style.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { deleteuser } from "../../redux/reducers/admin";
import { setAllUsers } from "../../redux/reducers/admin";
import { ImUsers } from "react-icons/im";
import { FaRegEye } from "react-icons/fa";
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
      .get("https://infintyzone.herokuapp.com/admin/users")
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
    <>
    <div className="Center-Container_Users ">
      <div className="clientsBar">
        <p>
          <ImUsers /> Clients
        </p>
      </div>
      {/* <div className="UsersInControlPanel"> */}
        {/* <div className="details-users_row"> */}
          <table  className="USERSTables">
        <tr>
      {/* <div className="details-Product-row"> */}
        <th className="table">#</th>
        <th className="table">profile Image</th>
        <th className="table">User Name</th>
        <th className="table">User email</th>
        <th className="table">Address</th>
        <th className="table">viewProfile</th>

        </tr>
        {/* </div> */}
        {allUsers &&
          allUsers.map((element, i) => {
            return (
              <>
              {/* <div className="details-users_row"> */}
                {/* <div className="details-Users"> */}
                <tr>
                <td className="table">{i + 1}</td>
                  <td className="table" >
                    <img src={element.profileImage} />
                  </td>
                 
                    <td  className="table">
                      
                      {`${element.firstName} ` + ` ${element.lastName}`}
                    </td >
                  
               
                    <td  className="table">{element.email}</td>
                  
                    <td  className="table">{element.Address}</td>
                 
                 
                  
                    <td  className="table"
                      onClick={() => {
                        navigate(`/admin/user/${element.id}`);
                      }}
                    >  <div className="eyeIcon">
                      <FaRegEye />  </div>
                    </td>
                
                {/* </div> */}
              {/* </div> */}
              </tr>
              </>  
              );
          })}
             </table>
      {/* </div> */}
    </div>
    </> );
};

export default UsersControlPanel;
