import { useForm } from "react-hook-form";
import LoginImage from "../../assets/images/login.png";
import CustomButton from "../../Components/CustomButton";
import Input from "../../Components/Input";
import SocialSignButtons from "../../Components/SocialSignButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../lib/validation";
import { login } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { tokenAtom, userAtom } from "../../Store/authAtom";

export default function LogIn() {
  const navigate = useNavigate();
  const setUser = useSetAtom(userAtom);
  const setToken = useSetAtom(tokenAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await login(data);
      console.log(res);
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);

      setUser(res.user);
      setToken(res.token);

      navigate(res.role === "Admin" ? "/admin/dashboard" : "/", {
        replace: true,
      });
    } catch (err) {
      alert(err.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      {/* right section */}
      <div className="w-[60%] ">
        <h2 className="text-3xl font-semibold mb-6 text-center mt-20">
          Sign in to your account
        </h2>
        <div className="pl-20 pr-10">
          <form onSubmit={handleSubmit(onSubmit)} className=" space-y-22">
            <Input
              register={register}
              type="email"
              placeholder="Email ID"
              name="email"
              label="Email"
              error={errors.email?.message}
            />

            <Input
              register={register}
              type="password"
              placeholder="Enter Password"
              name="password"
              label="Password"
              error={errors.password?.message}
            />

            <CustomButton type="submit" title="Sign In " />
          </form>

          {/* Social Sign Up Buttons */}
          <div className="mt-9">
            {/* sign up with */}
            <div className="flex items-center">
              <hr className="flex-grow border-t border-g-disabled" />
              <span className="text-sm text-g-disabled px-3.5">
                Sign in with
              </span>
              <hr className="flex-grow border-t border-g-disabled" />
            </div>

            <SocialSignButtons />
          </div>
        </div>
      </div>
      {/* left section */}
      <div className=" w-[40%] ">
        <img
          src={LoginImage}
          alt="SignUp Image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
