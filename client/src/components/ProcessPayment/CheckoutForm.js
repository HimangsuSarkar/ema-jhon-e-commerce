import React, { useState } from "react";

import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const CheckoutForm = ({ handlePayment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (error) {
      setPaymentError(error.message);
      setPaymentSuccess(null);
    } else {
      setPaymentSuccess(paymentMethod.id);
      setPaymentError(null);
      handlePayment(paymentMethod.id);
      console.log("[PaymentMethod]", paymentMethod);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe || !elements}>
          Pay
        </button>
      </form>
      {paymentError && <p style={{ color: "red" }}>{paymentError}</p>}
      {paymentSuccess && (
        <p style={{ color: "green" }}>
          Your payment is successfully done!!! Thank You👍
        </p>
      )}
    </div>
  );
};

export default CheckoutForm;
