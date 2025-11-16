import { useMutation } from "@tanstack/react-query";
import { registerUserAPI } from "../api/authApi";
import { registerSchema } from "../schemas/authSchemas";
import { Link } from "react-router-dom";
import React from "react";

export default function RegisterPage() {
  const mutation = useMutation({
    mutationFn: registerUserAPI,
    onSuccess: () => alert("Registered successfully!"),
    onError: () => alert("Registration failed"),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const confirmPassword = (form.elements.namedItem("confirmPassword") as HTMLInputElement).value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const formData = { name, email, password };

    const parsed = registerSchema.safeParse(formData);
    if (!parsed.success) {
      alert(parsed.error.issues[0].message);
      return;
    }

    mutation.mutate(parsed.data);
  };

  return (
    <div className="flex w-full h-screen">
      {/* Left Section */}
      <div className="w-[65%] h-full bg-black">
      <img src="BrandImage.png" alt=""  className="w-full h-full object-cover"/>
      </div>


      {/* Right Section */}
      <div className="w-[35%] h-full bg-white flex flex-col items-center justify-center text-black px-4">
        {/* Branding */}
         <div className="flex h-[55px] w-[150px]">
          <img src="/Logo.png" alt="Logo" className="w-full h-full object-contain" />
          <div className="w-[100px] h-[150px] ">
            <h1 className="text-gray-900 font-bold text-[20px]"> BuckUP!</h1>
            <p className="text-gray-500 font-bold text-[12px]">The todo App</p>
          </div>
        </div>
        {/* Welcome */}
        <div className="flex flex-col items-center justify-center mt-2 font-bold">
          <h1 className="text-[45px] bg-gradient-to-b from-[#0A325D]  to-[#0FA9E3] bg-clip-text text-transparent ">Create Account</h1>
          <p className="text-[#9A9A9A] text-[14px] font-normal text-center mt-1">
            Join us and start your life-saving journey today
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="flex flex-col mt-4 w-[320px]">
          <label className="font-medium text-sm mb-1">Full Name</label>
          <input
            name="name"
            type="text"
            placeholder="John Doe"
            required
            className="rounded-md text-sm text-[#848484] bg-[#EFECEC] p-2 mb-3"
          />

          <label className="font-medium text-sm mb-1">Email</label>
          <input
            name="email"
            type="email"
            placeholder="yourmail@example.com"
            required
            className="rounded-md text-sm text-[#848484] bg-[#EFECEC] p-2 mb-3"
          />

          <label className="font-medium text-sm mb-1">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Create a password"
            required
            className="rounded-md text-sm text-[#848484] bg-[#EFECEC] p-2 mb-3"
          />

          <label className="font-medium text-sm mb-1">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            required
            className="rounded-md text-sm text-[#848484] bg-[#EFECEC] p-2 mb-4"
          />

          {/* Terms */}
          <label className="flex items-center space-x-2 mb-4 text-xs">
            <input
              name="agree"
              type="checkbox"
              required
              className="accent-[#0ABCF9] w-3.5 h-3.5"
            />
            <span className="text-[#737373] font-medium">
              I agree to the{" "}
              <a href="#" className="text-[#0ABCF9] font-bold">
                Terms & Privacy
              </a>
            </span>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-gradient-to-b from-[#2C69D1] to-[#0ABCF9] hover:from-[#0ABCF9] hover:to-[#2C69D1] text-white p-2 rounded-lg font-semibold text-sm transition-all duration-300 h-[42px] shadow-md"
          >
            Sign Up
          </button>

          {/* Already have an account */}
          <p className="text-center text-xs text-[#737373] mt-5">
            Already have an account?{" "}
            <Link to="/" className="text-[#0ABCF9] font-bold">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
