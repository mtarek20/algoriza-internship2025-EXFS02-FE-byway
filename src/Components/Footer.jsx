import { Link } from "react-router-dom";
import FooterLogo from "../assets/images/footer-logo.png";
import Socials from "../assets/images/socials.png";

export default function Footer() {
  const getHelp = ["Contact Us", "Latest Articles", "FAQ"];
  const programs = [
    "Art & Design",
    "Business",
    "IT & Software",
    "Languages",
    "Programming",
  ];
  const contactUs = [
    "Address: 123 Main Street, Anytown, CA 12345",
    "Tel: +(123) 456-7890",
    "Mail: bywayedu@webkul.in",
  ];
  return (
    <footer className="bg-g-800 px-15 pt-20 pb-34">
      <div className="flex justify-between">
        {/* Footer first Content */}
        <div className="space-y-4 w-1/3">
          <img src={FooterLogo} alt="ByWay Logo" />
          <p className="text-sm text-g-300 font-normal">
            Empowering learners through accessible and engaging online
            education. <br />
            Byway is a leading online learning platform dedicated to providing
            high-quality, flexible, and affordable educational experiences.
          </p>
        </div>

        {/* Footer second Content */}
        <div className="space-y-2 ">
          <h3 className="text-lg font-semibold text-white">Get Help</h3>
          {getHelp.map((item) => (
            <p className="text-sm text-g-300 font-normal">{item}</p>
          ))}
        </div>

        {/* Footer third Content */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white">Programs</h3>
          {programs.map((item) => (
            <p className="text-sm text-g-300 font-normal">{item}</p>
          ))}
        </div>

        {/* Footer fourth Content */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white">Contact Us</h3>
          {contactUs.map((item) => (
            <p className="text-sm text-g-300 font-normal">{item}</p>
          ))}
          <img src={Socials} alt="social media icons" className="mt-6" />
        </div>
      </div>
    </footer>
  );
}
