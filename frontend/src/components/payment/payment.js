import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import axios from "axios";
import { setCart } from "../../redux/reducers/cart";

const currency = "USD";
const style = {
  layout: "horizontal",
  tagline: "false",
};

const ButtonWrapper = ({ currency, showSpinner }) => {
  const dispatch1 = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const { subTotal, token, cart } = useSelector((state) => {
    return {
      subTotal: state.cart.subTotal,
      token: state.auth.token,
    };
  });

  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  const addToOrders = () => {
    axios
      .post(
        `https://infintyzone.herokuapp.com/order`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log(result, `ORDER CHECKOUT`);
        dispatch1(setCart([]));
      })
      .catch((err) => {
        console.log(err, "ERR IN ORDER CHECKOUT");
      });
  };

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[subTotal, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: subTotal,
                  },
                },
              ],
              application_context: {
                shipping_preference: "NO_SHIPPING",
              },
            })
            .then((orderId) => {
              console.log("ORDER CREATED ");
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(function () {
            console.log("ORDER AFTER SUBMIT");
            addToOrders();
          });
        }}
      />
    </>
  );
};

export default function Payment() {
  return (
    <div className="PaymentDiv">
      <PayPalScriptProvider
        // options={{
        //     "client-id": "AW3d7emklURf4rIFvBmQ14R_oT523r5PjxbsraFbK5vhDVvWE6imlOkzkIY9WrfTNF9EBVrwGuWTxsQM",
        //     components: "buttons",
        //     currency: "USD"
        // }}
        options={{
          "client-id":
            "AUGXriRIYNCsYdoXMJrXu5EwNO5FWg7E-NSHbM5ZvplLNrjq7FdkwCsxT5gw-Wwc9ZfMPHOs0u-cOVah",
          components: "buttons",
          currency: "USD",
        }}
      >
        <ButtonWrapper currency={currency} showSpinner={false} />
      </PayPalScriptProvider>
    </div>
  );
}
