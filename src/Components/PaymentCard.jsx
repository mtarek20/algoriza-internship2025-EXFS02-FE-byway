import VisaImg from "../assets/images/visa.png";

import PaymentInput from "./PaymentInput";

export default function PaymentCard() {
  return (
    <>
      <div className="bg-grayBackground p-4 rounded-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input type="radio" className="w-5 h-5" />
            <h3 className="ml-2.5 text-lg font-semibold text-g-900">
              Credit/Debit Card
            </h3>
          </div>

          <img src={VisaImg} alt="visa-img" />
        </div>

        <form className="space-y-4">
          <PaymentInput label="Name of Card" placeholder="Name of Card" />
          <PaymentInput label="Card Number" placeholder="Card Number" />

          <div className="flex space-x-4">
            <PaymentInput label="Expiry Date" placeholder="MM/YY" />
            <PaymentInput label="CVC/CVV" placeholder="CVC/CVV" />
          </div>
        </form>
      </div>
    </>
  );
}
