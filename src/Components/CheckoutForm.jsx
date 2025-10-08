import React from "react";
import Input from "./Input";
import PaymentCard from "./PaymentCard";
import PaypalImg from "../assets/images/paypal.png";

export default function CheckoutForm() {
  return (
    <div className="p-4 border border-graylight rounded-2xl space-y-4">
      <form className="flex space-x-4">
        <Input label="Country" placeholder="Enter Country" />
        <Input label="State/Union Territory" placeholder="Enter State" />
      </form>

      {/* Payment Method */}
      <h3 className="text-lg font-semibold text-g-900 mb-2">Payment Method</h3>

      {/* <PaymentCard /> */}

      <div className="bg-grayBackground p-4 rounded-lg">
        {/* Paypal */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input type="radio" className="w-5 h-5" />
            <h3 className="ml-2.5 text-lg font-semibold text-g-900">PayPal</h3>
          </div>

          <img src={PaypalImg} alt="visa-img" />
        </div>
      </div>
    </div>
  );
}
