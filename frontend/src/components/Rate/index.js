// import "./style.css"
// import React, { useContext, useEffect ,useState} from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate,useParams } from "react-router-dom";
// import axios from "axios";
// import {addRate} from "../../redux/reducers/rate"
// const Rate = () => { 
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const [message, setMessage] = useState("");
//     const [rateNew, setNewRate] = useState("");
//     const { products ,rate} = useSelector((state) => {
//         return {
//           products: state.products.products,
//           rate:state.rate.rate

//         };
//       });
//       const addRating = ()=> { 
// axios.post(`http://localhost:5000/rating/${id}`,{
//     rate:rateNew
// }).then((result)=>{
//     console.log(result,"rate resultttt");
// // dispatch(addRate())
// }).catch((err)=>{
//     setMessage(err.response.data.message);
// })
//       }
//    
//     return(
//         <div>
//               <p onClick={()=>{
//                   addRating();
//               }}>Rate</p>
//             <input placeholder="rate it from 0-5" onChange={(e)=>{
//                 setNewRate(e.target.value)
//             }}/>
          
//         </div>
        
//     )
// }
// export default  Rate