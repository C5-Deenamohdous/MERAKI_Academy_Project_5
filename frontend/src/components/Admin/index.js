import "./style.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { setAllUsers } from "../../redux/reducers/admin";

const AdminPanel = () => {
  const dispatch = useDispatch();

  const { admin } = useSelector((state) => {
    return {
      admin: state.admin.allUsers,
    };
  });

  useEffect(() => {
    getAllUsers()
  }, []);

  const getAllUsers = () => {
    axios
      .get("http://localhost:5000/admin/users")
      .then((result) => {
        console.log(result);
        // dispatch(setAllUsers())
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return <div></div>;
};

export default AdminPanel;
