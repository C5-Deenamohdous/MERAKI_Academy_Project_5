//userprofile
// i need to git the user info from the databace using the userid from 
//the token

import React, {useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";


//put // http://localhost:5000/user/6
// get("/:id", getUserById);
// get("/users", getAllusers);
// delete("/:id", deleteUserById); 
// put("/:id", updateUserById); 


const UserProfile = ()=>{

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");

    const getUserById = () => {
        axios
          .get(`http://localhost:5000/user/${id}`)
          .then((result) => {
            console.log(result, "******one product");
            // dispatch(setOneProduct(result.data.result));
            setMessage("user with ID");
          })
          .catch((err) => {
            console.log(err);
            setMessage(err.response.data.message);
          });
      };
      useEffect(() => {
        getUserById();
      }, []);


return(
<>



</>

);


}

export default UserProfile;
