import DoneImg from "../../assets/images/done.png";
import CustomButton from "../../Components/CustomButton";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../CustomHooks/useCart";
import { useEffect } from "react";

export default function PurchaseCompletePage() {
  const { loadCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);
  return (
    <div className="h-[calc(100vh-83px)]">
      <div className="flex flex-col justify-center items-center text-center h-full">
        <img src={DoneImg} alt="done-image" className="mb-4" />

        <div className="space-y-2">
          <h1 className="text-size-40 font-bold text-g-900">
            Purchase Complete
          </h1>
          <p className="text-2xl font-semibold text-[#595959]">
            You Will Receive a confirmation email soon!
          </p>
        </div>

        <div className="mt-6 w-3xs ">
          <CustomButton
            withIcon={false}
            title="Back to Home "
            fullWidth={true}
            onClick={() => navigate("/", { replace: true })}
          />
        </div>
      </div>
    </div>
  );
}
