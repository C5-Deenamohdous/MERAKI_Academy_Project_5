import "./style.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminAllOrders from "../AdminAllOrders";
import AdminCompletedOrders from "../AdminCompletedOrders";
import AdminUnCompletedOrders from "../AdminUnCompletedOrders";
import { VscListOrdered } from "react-icons/vsc";
const Orders = () => {
  const [isAllOrder, setIsAllOrder] = useState(true);
  const [isCompletedOrder, setIsCompletedOrder] = useState(false);
  const [isUnCompleted, setIsUnCompleted] = useState(false);

  return (
    <div className="Center-Container_Orders">
        <div className="headerOFOrderTables">
        <VscListOrdered/><span>Orders</span> 
       </div>
      <div className="One-Order">
     
        <table className="ordersTable">
          <tr>
            <th className="idOfOrder"># Order</th>
            <th className="idOfOrder">Date</th>
            {/* <th className="idOfOrder">Status</th>{" "} */}
            <th className="idOfOrder">
              <select className="OrderSelector"
                onChange={(e) => {
                  console.log(e.target.value);
                  if (e.target.value == 1) {
                    setIsAllOrder(true);
                    setIsCompletedOrder(false);
                    setIsUnCompleted(false);
                  }
                  if (e.target.value == 2) {
                    setIsAllOrder(false);
                    setIsCompletedOrder(true);
                    setIsUnCompleted(false);
                  }
                  if (e.target.value == 3) {
                    setIsAllOrder(false);
                    setIsCompletedOrder(false);
                    setIsUnCompleted(true);
                  }
                }}
              >
                <option  value="1">All Orders</option>
                <option value="2">Completed</option>
                <option value="3">Un Completed</option>
              </select>
            </th>
          </tr>
        </table>
      </div>
      {isAllOrder ? <AdminAllOrders /> : ""}
      {isCompletedOrder ? <AdminCompletedOrders /> : ""}
      {isUnCompleted ? <AdminUnCompletedOrders /> : ""}
    </div>
  );
};

export default Orders;
