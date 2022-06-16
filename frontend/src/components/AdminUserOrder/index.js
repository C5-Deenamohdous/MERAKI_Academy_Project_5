import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { setAllUserOrders } from "../../redux/reducers/orders";
import OrderStatus from "../ChangeOrderStatus";

const AdminUserOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allUSerOrders } = useSelector((state) => {
    return {
      allUSerOrders: state.orders.allUSerOrders,
    };
  });
  const getAllUserOrders = () => {
    axios.get(`https://infintyzone.herokuapp.com/order/user/${id}`).then((result) => {
      console.log(result);
      dispatch(setAllUserOrders(result.data.result));
    });
  };

  useEffect(() => {
    getAllUserOrders();
  }, []);

  //   console.log("ALLL ORDERDS", allOrders);
  // return (
  //   <>
  //     {allUSerOrders &&
  //       allUSerOrders.map((element) => {
  //         return (
  //           <div className="One-OrderForOneUser">
  //             <table className="ordersTableForOneUser">
  //               <tr
  //                 className={
  //                   element.orderStatus
  //                     ? "completedOrdersColorOneUser"
  //                     : "unCompletedOrdersColorOneUser"
  //                 }
  //               >
  //             <th
  //               onClick={() => {
  //                 navigate(`/admin/order_details/${element.id}`);
  //               }}
  //             >
  //               {element.id}
  //             </th>
  //             <th className="idOfOrder">
  //               {element.orderDate.substring(0, 10)}
  //             </th>
  //             {/* <p>{element.Status ? "Completed" : "Un Completed"} </p> */}
  //             <th className="idOfOrder">
  //               <OrderStatus
  //                 order_id={element.id}
  //                 orderStatus={element.orderStatus}
  //               />
  //             </th>
  //             </tr>
  //             </table>
  //           </div>
  //         );
  //       })}
  //   </>
  // );
  return (
    <>
      {allUSerOrders &&
        allUSerOrders.map((element) => {
          return (
            <div className="One-OrderForOneUser"
      
              // onClick={() => {
              //   navigate(`/admin/order_details/${element.id}`);
              // }}
            >
               <table className="ordersTableForOneUser">
               <tr
                  className={
                    element.orderStatus
                      ? "completedOrdersColorOneUser"
                      : "unCompletedOrdersColorOneUser"
                  }
                >
              <td>{element.id}</td>
              <td>{element.orderDate}</td>
              {/* <th>{element.Status ? "Completed" : "Un Completed"} </th> */}
            <td>  <OrderStatus
                orderStatus={element.orderStatus}
                order_id={element.id}
              /></td>
              </tr>
              </table>
            </div>
          );
        })}
    </>
  );
};



export default AdminUserOrder;
