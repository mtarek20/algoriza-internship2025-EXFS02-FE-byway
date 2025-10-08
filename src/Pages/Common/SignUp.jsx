import { useForm } from "react-hook-form";
import SignUpImage from "../../assets/images/signup-image.png";
import CustomButton from "../../Components/CustomButton";
import Input from "../../Components/Input";
import SocialSignButtons from "../../Components/SocialSignButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../../lib/validation";
import { signup } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { tokenAtom, userAtom } from "../../Store/authAtom";

export default function SignUp() {
  const navigate = useNavigate();

  const setUser = useSetAtom(userAtom);
  const setToken = useSetAtom(tokenAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await signup(data);
      console.log(res);
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);

      setUser(res.user);
      setToken(res.token);

      navigate(res.role === "User" && "/", {
        replace: true,
      });
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed ❌");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* left section */}
      <div className=" w-[40%] ">
        <img
          src={SignUpImage}
          alt="SignUp Image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* right section */}
      <div className="w-[60%] ">
        <h2 className="text-3xl font-semibold mb-6 text-center mt-20">
          Create Your Account
        </h2>
        <div className="pr-20 pl-10">
          <form className=" space-y-22" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex space-x-30">
              <Input
                type="text"
                placeholder="First Name"
                label="First Name"
                name="firstName"
                register={register}
                error={errors.firstName?.message}
              />
              <Input
                register={register}
                name="lastName"
                type="text"
                placeholder="Last Name"
                label="Last Name"
                error={errors.lastName?.message}
              />
            </div>
            <Input
              register={register}
              name="username"
              type="text"
              placeholder="username"
              label="Username"
              error={errors.username?.message}
            />
            <Input
              register={register}
              name="email"
              type="email"
              placeholder="Email ID"
              label="Email"
              error={errors.email?.message}
            />
            <div className="flex space-x-30">
              <Input
                register={register}
                name="password"
                type="password"
                placeholder="Enter Password"
                label="Password"
                error={errors.password?.message}
              />
              <Input
                register={register}
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                label="Confirm Password"
                error={errors.confirmPassword?.message}
              />
            </div>
            <CustomButton type="submit" title="Create Account" />
          </form>

          {/* Social Sign Up Buttons */}
          <div className="mt-9">
            {/* sign up with */}
            <div className="flex items-center">
              <hr className="flex-grow border-t border-g-disabled" />
              <span className="text-sm text-g-disabled px-3.5">
                Sign up with
              </span>
              <hr className="flex-grow border-t border-g-disabled" />
            </div>

            <SocialSignButtons />
          </div>
        </div>
      </div>
    </div>
  );
}
