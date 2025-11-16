import { useMutation } from "@tanstack/react-query";
import { loginUserAPI } from "../api/authApi";
import { loginSchema } from "../schemas/authSchemas";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
   const navigate = useNavigate(); 
  const mutation = useMutation({
    mutationFn: loginUserAPI,
    onSuccess: () => {
    alert("Logged in!");
    navigate("/dashboard");
  },
    onError: () => alert("Invalid credentials"),
  });

 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = e.currentTarget;

  const email = (form.elements.namedItem("email") as HTMLInputElement).value;
  const password = (form.elements.namedItem("password") as HTMLInputElement).value;

  const formData = { email, password };

  // Optional: Zod validation
  const parsed = loginSchema.safeParse(formData);
  if (!parsed.success) {
    alert(parsed.error.issues[0].message);
    return;
  }

  // Call backend via React Query
  mutation.mutate(parsed.data);
};

  return (
   <div className="flex h-screen">
  {/* Left Section */}
  <div className="w-[65%] h-full bg-black">
   <img src="BrandImage.png" alt=""  className="w-full h-full object-cover"/>
  </div>

  {/* Right Section */}
  <div className="w-[35%] h-full bg-white flex flex-col items-center justify-center text-black">
    {/* Branding */}
    <div className="flex h-[55px] w-[150px]">
      <img src="/Logo.png" alt="Logo" className="w-full h-full object-contain" />
      <div className="w-[100px] h-[150px] ">
        <h1 className="text-gray-900 font-bold text-[20px]"> BuckUP!</h1>
        <p className="text-gray-500 font-bold text-[12px]">The todo App</p>
      </div>
    </div>

    {/* Welcome */}
    <div className="flex flex-col items-center justify-center mt-[5%] font-bold">
      <h1 className="text-[60px] bg-gradient-to-b from-[#0A325D]  to-[#0FA9E3] bg-clip-text text-transparent ">Welcome</h1>
      <p className="text-[#9A9A9A] text-[17px] font-normal">
        Sign in to check your Todos
      </p>
    </div>

    {/* Login Form */}
    <form onSubmit={handleSubmit} className="flex flex-col mt-[5%]">
      <h3 className="font-medium">Email</h3>
      <input
        name="email"
        type="email"
        placeholder="yourmail@example.com"
        className="rounded-md font-medium text-[#848484] focus:bg-white bg-[#EFECEC] p-2 mb-4 w-[380px]"
        required
      />
      <h3 className="font-medium">Password</h3>
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="rounded-md font-medium text-[#848484] focus:bg-white bg-[#EFECEC] p-2 mb-4 w-[380px]"
        required
      />

      {/* Remember Me */}
      <div className="flex items-center justify-between mb-4 text-sm">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="accent-[#0FA9E3] w-4 h-4 cursor-pointer" />
          <span className="text-[#737373] font-medium">Remember me</span>
        </label>
        <a href="#" className="text-[#0FA9E3] font-bold">Forgot Password</a>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="bg-gradient-to-b from-[#2C69D1] to-[#0ABCF9] hover:from-[#CD1E2D] hover:to-[#F2335A] text-white p-2 rounded-lg font-bold transition-all duration-300 h-[50px] shadow-lg"
      >
        Sign In
      </button>
      <p className="text-center text-xs text-[#737373] mt-5">
            Dont have an account?{" "}
            <Link to="/register" className="text-[#0ABCF9] font-bold">
              Sign Up
            </Link>
          </p>
    </form>
  </div>
</div>

  );
}
