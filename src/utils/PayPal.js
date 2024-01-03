import React, { Children, useEffect, useState } from "react";
import * as PaymentService from "../services/PaymentService";
import { PayPalButton } from "react-paypal-button-v2";
import Message from "../components/Message/Message";
import Loading from "../components/LoadingComponent/LoadingComponent";
const PayPal = ({ onSuccessPaypal, isSdkReady }) => {
  const [sdkReady, setSdkReady] = useState(false);

  const addPaypalScript = async () => {
    const { data } = await PaymentService.getConfigPayment();
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!window.paypal) {
      addPaypalScript();
    } else {
      setSdkReady(true);
    }
  }, []);

  return (
    sdkReady && (
      <Loading
        isLoading={!sdkReady}
        children={
          <div style={{ width: "320px" }}>
            <PayPalButton
              amount="0.01"
              onSuccess={onSuccessPaypal}
              onError={() => {
                Message({
                  typeMes: "error",
                  mes: "Có lỗi xảy ra, Vui lòng thử lại",
                });
              }}
            />
          </div>
        }
      />
    )
  );
};

export default PayPal;
