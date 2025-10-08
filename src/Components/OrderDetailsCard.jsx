import Divider from "./Divider";

export default function OrderDetailsCard({ price, discount, tax }) {
  const total = price - discount + tax;
  return (
    <div className="flex flex-col space-y-4">
      <div className=" p-4 border border-graylight rounded-lg bg-grayBackground space-y-4">
        {/* price */}
        <div className="flex justify-between">
          <p className="text-size-16 font-normal text-g-900">Price</p>
          <h4 className="text-lg font-semibold text-g-900">${price}</h4>
        </div>
        {/* Discount */}
        <div className="flex justify-between">
          <p className="text-size-16 font-normal text-g-900">Discount</p>
          <h4 className="text-lg font-semibold text-g-900">{discount}</h4>
        </div>
        {/* Tax */}
        <div className="flex justify-between">
          <p className="text-size-16 font-normal text-g-900">Tax</p>
          <h4 className="text-lg font-semibold text-g-900">$0.15</h4>
        </div>
        {/* Divider */}
        <Divider />

        {/* Total */}
        <div className="flex justify-between">
          <p className="text-xl font-semibold text-g-900">Total</p>
          <h4 className="text-xl font-semibold text-g-900">${total}</h4>
        </div>
      </div>
    </div>
  );
}
