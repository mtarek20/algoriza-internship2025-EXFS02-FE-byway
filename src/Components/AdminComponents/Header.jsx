import { BellIcon } from "lucide-react";
import Divider from "../Divider";
export default function Header({ title }) {
  return (
    <div className=" space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-medium text-[#202637]">{title}</h2>

        <div className="w-12 h-12 rounded-full bg-white shadow-notification flex items-center justify-center">
          <BellIcon color="#96A0B6" />
        </div>
      </div>
      <Divider />
    </div>
  );
}
