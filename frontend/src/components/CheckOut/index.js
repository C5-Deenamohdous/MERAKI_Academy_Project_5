// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import { setCart } from "../../redux/reducers/cart";
// import Payment from "../payment/payment";

// const CheckOut = () => {
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => {
//     return {
//       token: state.auth.token,
//     };
//   });
//   const addToOrders = () => {
//     axios
//       .post(
//         `http://localhost:5000/order`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((result) => {
//         console.log(result, `ORDER CHECKOUT`);
//         dispatch(setCart([]));
//       })
//       .catch((err) => {
//         console.log(err, "ERR IN ORDER CHECKOUT");
//       });
//   };

//   return (
//     <div>
//       <button
//         onClick={() => {
//           addToOrders();
//         }}
//       >
//         CheckOut
//       </button>
//       <Payment />
//     </div>
//   );
// };

// export default CheckOut;

// aaaaaaaa