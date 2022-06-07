import React, { useState } from "react";
import AdminUserOrder from "../AdminUserOrder";
import AdminUserCompletedOrders from "../AdminCompletedUserOrder";
import AdminUserUnCompletedOrders from "../AdminUnCompletedUserOrder";

const AdminPanelUserOrderContainer = () => {
  const [isAdminUserOrder, setIsAdminUserOrder] = useState(true);
  const [isAdminUserCompletedOrders, setIsAdminUserCompletedOrders] =
    useState(false);
  const [isAdminUserUnCompletedOrders, setIsAdminUserUnCompletedOrders] =
    useState(false);

  return (
    <div className="Center-Container">
      <div className="Container-Orders">
        <div className="One-Order">
          <p># Order</p>
          <p>Date</p>
          <p>Status</p>
          <select
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
        </div>
        {isAdminUserOrder ? <AdminUserOrder /> : ""}
        {isAdminUserCompletedOrders ? <AdminUserCompletedOrders /> : ""}
        {isAdminUserUnCompletedOrders ? <AdminUserUnCompletedOrders /> : ""}
      </div>
    </div>
  );
};

export default AdminPanelUserOrderContainer;
