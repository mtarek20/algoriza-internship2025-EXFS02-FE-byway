import RightArrow from "../assets/icons/chevron-right-black.svg";

export default function BreadCrump({ firstBread, SecondBread, thirdBread }) {
  return (
    <div className="flex items-center">
      <div className="flex ">
        <h3 className="text-sm  text-g-700">{firstBread}</h3>
        <img src={RightArrow} alt="right-arrow-icon" className="ml-2" />
      </div>

      <div className="flex ml-2">
        <h3 className="text-sm  text-g-700">{SecondBread}</h3>
        <img src={RightArrow} alt="right-arrow-icon" className="ml-2" />
      </div>

      <div className="flex ml-2">
        <h3 className="text-sm  text-primary-600">{thirdBread}</h3>
      </div>
    </div>
  );
}
