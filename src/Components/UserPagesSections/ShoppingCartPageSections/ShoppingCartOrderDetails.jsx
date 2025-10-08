import CustomButton from "../../CustomButton";
import OrderDetailsCard from "../../OrderDetailsCard";

export default function ShoppingCartOrderDetails() {
  return (
    <>
      <h3 className="text-xl font-semibold text-g-900 mb-2 ">Order Details</h3>

      <OrderDetailsCard price="$135.00" discount="$0.00" tax="$20.25" />

      <div className="mt-4">
        <CustomButton
          title="Proceed to Checkout"
          withIcon={false}
          fullWidth={true}
        />
      </div>
    </>
  );
}
