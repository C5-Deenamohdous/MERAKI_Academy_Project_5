import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import Modal from "react-modal";
import {  BsCheckCircleFill ,BsFillTelephoneFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { RiMailUnreadFill } from "react-icons/ri";
import "./style.css";
const ContactUs = () => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_1h0nflc",
        "template_0oc8ifp",
        form.current,
        "4qjKDmecaKgSq4X7L"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return ( <>
     <div className="text"> 
     <span className="paragarph"> Contact  </span><span className="text3">US</span></div>
   
    
     <div  className="container2">
      <div className="formCon">
      <form className="form-row" ref={form} onSubmit={sendEmail}>
        <div>
          <label className="label"></label>
          <input
            placeholder="Name"
            className="input-data"
            type="text"
            name="user_name"
          />
          <br />

          <input
            placeholder="Email"
            className="input-data"
            type="email"
            name="user_email"
          />
          <br />

          <input
            placeholder="Message"
            className="input-data-textarea"
            name="message"
          />
          <br />

          <input
            className="buttonSend"
            type="submit"
            value="Send"
            onClick={() => {
              setIsOpen(true);
              setTimeout(() => {
                setIsOpen(false);
              }, 2000);
            }}
          />
          <Modal
            ariaHideApp={false}
            className={"popUp"}
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
          >
            <div className="popUpContainer">
              <div className="paragrapgh">
         <p className="text1"><b>Thank you for getting in touch!</b>  <p>*Please Check you Mail </p></p>
      
          </div>
        <span className="imgGreen"> <BsCheckCircleFill/> </span>
          </div>
          </Modal>
        </div>
      </form>
      </div>
      <div className="rightSide">
<p className="locationIcon"><IoLocationSharp/> 
<span className="info">Amman, Jordan</span>
</p>
<p className="phoneIcon"><BsFillTelephoneFill/> 
<span  className="info">0795366562</span>
</p>
<p className="mailIcon"><RiMailUnreadFill/>
<span  className="info">ADA_Store@gmail.com</span>
 </p>

      </div>
      
      </div>
   
    </>
  );
};
export default ContactUs;
