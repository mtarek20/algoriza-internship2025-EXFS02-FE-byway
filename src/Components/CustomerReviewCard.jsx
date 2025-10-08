import DoubleQuotes from "../assets/icons/double-quotes.svg";
import CustomerImg from "../assets/images/customer.png";
export default function CustomerReviewCard() {
  return (
    <div className="p-6 rounded-2xl bg-white border border-graylight shadow-card ">
      <div className="flex flex-col space-y-2">
        <img src={DoubleQuotes} alt="double quotes" className="w-12 h-12" />
        <p className="text-[16px] text-black leading-relaxed">
          "Byway's tech courses are top-notch! As someone who's always looking
          to stay ahead in the rapidly evolving tech world, I appreciate the
          up-to-date content and engaging multimedia.
        </p>

        <div className="flex items-center space-x-2">
          <img src={CustomerImg} alt="customer" className="w-15 h-15 " />
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold ">John Doe</h3>
            <p className="text-sm text-g-700">Designer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
