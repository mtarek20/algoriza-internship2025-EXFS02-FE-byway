import FacebookIcon from "../assets/icons/Facebook_Logo_Primary 2.svg";
import GoogleIcon from "../assets/icons/google.svg";
import MicrosoftIcon from "../assets/icons/microsoft-icon.svg";
export default function SocialSignButtons() {
  return (
    <div className="flex items-center justify-center space-x-4 mt-6">
      <button className="flex items-center justify-center space-x-2 border border-major-shade rounded-lg py-3 px-14 ">
        <img src={FacebookIcon} alt="Facebook Icon" />
        <span className="text-sm text-facebook">Facebook</span>
      </button>

      <button className="flex items-center space-x-2 border border-major-shade rounded-lg py-3 px-14 ">
        <img src={GoogleIcon} alt="Google Icon" />
        <span className="text-sm text-google">Google</span>
      </button>

      <button className="flex items-center space-x-2 border border-major-shade rounded-lg py-3 px-14 ">
        <img src={MicrosoftIcon} alt="Microsoft Icon" />
        <span className="text-sm ">Microsoft</span>
      </button>
    </div>
  );
}
