import React, { useState } from "react";
import AdminUserOrder from "../AdminUserOrder";
import AdminUserCompletedOrders from "../AdminCompletedUserOrder";
import AdminUserUnCompletedOrders from "../AdminUnCompletedUserOrder";
import "./style.css"
import { VscListOrdered } from "react-icons/vsc";

const AdminPanelUserOrderContainer = () => {
  const [isAdminUserOrder, setIsAdminUserOrder] = useState(true);
  const [isAdminUserCompletedOrders, setIsAdminUserCompletedOrders] =
    useState(false);
  const [isAdminUserUnCompletedOrders, setIsAdminUserUnCompletedOrders] =
    useState(false);

  return (
    <div className="Center-ContainerOrderContainerComponent">
        <div className="headerOFOrderForUser">
      <span className="orderIconInOneOrder"><VscListOrdered/></span>   <span>Client's Order</span> 
       </div>
     
      
        <div className="One-OrderForOneUser">
        <table className="ordersTableForOneUser">
        <tr>
        <th className="idOfOrder"># Order</th>
            <th className="idOfOrder">Date</th>
        
            <th className="idOfOrder">
          <select className="OrderSelectorForOneUser"
            onChange={(e) => {
              console.log(e.target.value);
              if (e.target.value == 1) {
                setIsAdminUserOrder(true);
                setIsAdminUserCompletedOrders(false);
                setIsAdminUserUnCompletedOrders(false);
              }
              if (e.target.value == 2) {
                setIsAdminUserOrder(false);
                setIsAdminUserCompletedOrders(true);
                setIsAdminUserUnCompletedOrders(false);
              }
              if (e.target.value == 3) {
                setIsAdminUserOrder(false);
                setIsAdminUserCompletedOrders(false);
                setIsAdminUserUnCompletedOrders(true);
              }
            }}
          >
            <option value="1">All Orders</option>
            <option value="2">Completed</option>
            <option value="3">Un Completed</option>
          </select>
          </th>
          </tr>
          </table>
        </div>
        {isAdminUserOrder ? <AdminUserOrder /> : ""}
        {isAdminUserCompletedOrders ? <AdminUserCompletedOrders /> : ""}
        {isAdminUserUnCompletedOrders ? <AdminUserUnCompletedOrders /> : ""}
      </div>
    
  );
};

export default AdminPanelUserOrderContainer;
