import "./style.css";
import React, { useState } from "react";
import axios from "axios";
const UploadImg = ({ setProfileImage ,setUrl ,url}) => {
  const [image, setImage] = useState("");
  // const [url, setUrl] = useState("");

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "rpiutt6w");
    axios
      .post("https://api.cloudinary.com/v1_1/dvxtq6nio/image/upload", data)
      .then((result) => {
        console.log(result, "result in cloudinary");
        setUrl(result.data.url);
        // setProfileImage(result.data.url)
      })

      .catch((err) => {
        console.log(err, "cloudinary err");
      });
  };
  return (
    <div>
      <div>
        <input
          type={"file"}
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <br/>
        <button
          onClick={() => {
            {
              uploadImage();
            }
          }}
        >
          Upload
        </button>
      </div>
      <div>
        {/* <img src={url} /> */}
      </div>
    </div>
  );
};
export default UploadImg;
