import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
// =================================================================
const Register = () => {

    const isLoggedIn = useSelector((state) => {
        return {
            isLoggedIn: state.auth.isLoggedIn
        };
    });
    console.log(isLoggedIn);

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const role_id = "1";
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(false);
    const[isClick,setIsClick]=useState(false)
    // =================================================================

    const addNewUser = async () => {
        try {
            const result = await axios.post("http://localhost:5000/register", {

                firstName,
                lastName,
                phoneNumber,
                profileImage,
                email,
                password,
                role_id,

            });
            if (result.data.success) {
                setStatus(true);
                setMessage("The user has been created successfully");
                navigate("/login");
            } else throw Error;
        } catch (error) {
            setStatus(false);
            if (error.response && error.response.data) {
                return setMessage(error.response.data.message);
            }
            setMessage("Error happened while register, please try again");
        }
    };

    // =================================================================

    return (
        <>
            <div className="center">
                {isLoggedIn ? (
                    <>
                       
                        <center >
                        <ul className="login-Register-MenuRegister">

          <li  className="login" onClick={()=>{
         navigate("/Login") 
        }}> Login  </li>
          <li className="register" onClick={()=>{
         navigate("/Register") 
        }}> Register  </li>
        </ul>
                            <div className="inputbox">
                                <input  className="firstNameInput"
                                placeholder=" First Name"
                                    type="text"
                                    required="required"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                               
                            </div>
                            <div className="inputbox">
                                <input className="lastNameInput"
                                placeholder="Last Name"
                                    type="text"
                                    required="required"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                               
                            </div>


                            <div className="inputbox">
                                <input
                                className="phoneNumInput"
                                placeholder=" phone Number"
                                    type="text"
                                    required="required"

                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                              
                            </div>
                            <div className="inputbox">
                                <input className="firstNameInput"
                                placeholder=" profile Image"
                                    type="text"
                                    required="required"
                                    onChange={(e) => setProfileImage(e.target.value)}
                                />
                             
                            </div>
                            <div className="inputbox">
                                <input className="emailInput"
                                placeholder="Email"
                                    type="text"
                                    required="required"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                              
                            </div>
                            <div className="inputbox">
                                <input className="passwordInput"
                                placeholder="Password"
                                    type="password"
                                    required="required"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                               
                            </div>
                            <button className="registerButton" onClick={()=>{
                            addNewUser();
                            }}>Create</button>
                            {status
                                ? message && <div className="SuccessMessage">{message}</div>
                                : message && <div className="ErrorMessage">{message}</div>}
                        </center>
                    </>
                ) : (
                    
                    ""
                )}
            </div>
        </>
    );
};

export default Register;
