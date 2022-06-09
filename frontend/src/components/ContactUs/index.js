import React, { useRef } from "react";
import emailjs from "emailjs-com";
import "./style.css";
const ContactUs = () => {
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
          <input placeholder="Name" className="input-data" type="text" name="user_name" />
          <br />
         
          <input placeholder="Email" className="input-data" type="email" name="user_email" />
          <br />
          
          <input placeholder="Message" className="input-data-textarea" name="message" />
          <br />
          <input className="buttonSend" type="submit" value="Send" />{" "}
        </div>
      </form>
    </div>
  );
};
export default ContactUs;
