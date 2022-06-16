import "./style.css";
import React, { useState } from "react";
import axios from "axios";
import { BsFillCameraFill } from "react-icons/bs";
const UploadImg = ({ setProfileImage, setUrl, url }) => {
  const [image, setImage] = useState("");
  const [isImgSet, setIsImg] = useState(false);

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "rpiutt6w");
    axios
      .post("https://api.cloudinary.com/v1_1/dvxtq6nio/image/upload", data)
      .then((result) => {
        console.log(result, "result in cloudinary");
        setUrl(result.data.url);
        setIsImg(false);
      })

      .catch((err) => {
        console.log(err, "cloudinary err");
      });
  };
  return (
    <div className="cloud">
      <label htmlFor="photoID" className="Test-A">
       <span> <BsFillCameraFill /> </span>
      </label>
      <input
        id="photoID"
        type={"file"}
        onChange={(e) => {
          setImage(e.target.files[0]);
          setIsImg(true);
        }}
      />
      {isImgSet ? uploadImage() : ""}
      <br />
    </div>
  );
};
export default UploadImg;
