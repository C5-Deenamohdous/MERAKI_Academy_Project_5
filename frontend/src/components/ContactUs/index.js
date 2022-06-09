import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import Modal from "react-modal";

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

  return (
    <div class="container">
      <p className="text"> Contact us </p>
      
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
         <p className="text1"><b>Thank you for getting in touch!</b><br/>*Please Check you Mail  </p> 
      
          <br/>
          <br/>
          <img className="imgGreen" src="https://www.displaysense.co.uk/images/social-distancing-glow-in-the-dark-green-tick-sticker-85mm-p3755-14416_image.jpg"/></div>
          </Modal>
        </div>
      </form>
    </div>
  );
};
export default ContactUs;
