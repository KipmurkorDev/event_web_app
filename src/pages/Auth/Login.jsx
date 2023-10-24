import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${baseUrl}/users/login`, formData);
      if (response.status === 200) {
        toast.success("Successfully Login", {
          position: toast.POSITION.TOP_RIGHT,
        });
        // Storing an access token in localStorage
        localStorage.setItem("accessToken", response.data.token);

        navigate("/home");
      } else {
        toast.error("Something went wrong", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/home");
      }
    } catch (error) {
      if (error.response) {
        setIsSubmitting(false);
        if (error.response.status === 404) {
          toast.error("User not registered");
        } else if (error.response.status === 401) {
          toast.error("Wrong Credentials");
        } else if (error.response.status === 400) {
          setErrors(error.response.data.errors);
          toast.error("Some fields are missing");
        } else {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error("An error occurred");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  };

  const label = "text-black text-xl font-medium";
  const input =
    "bg-gray-100 rounded-[10px] w-full h-[2.7em] px-4 py-2 mt-2 text-black text-lg font-medium";

  return (
    <>
    <div className="flex items-center justify-center min-h-screen">
      <div className="font-['Montserrat'] p-4 md:ml-4 lg:ml-20 my-8">
        <h2 className="text-black font-medium text-2xl md:text-4xl py-3 md:py-6">
          Welcome Back !!
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col">
            <label htmlFor="email" className={label}>
              Email
            </label>
            <input
              type="text"
              placeholder="name@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${input} border border-gray-300`}
              disabled={isSubmitting}
            />
            {errors.email && <div className="text-red-500">{errors.email}</div>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className={label}>
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`${input} border border-gray-300`}
              disabled={isSubmitting}
            />
            {errors.password && (
              <div className="text-red-500">{errors.password}</div>
            )}
          </div>

          <div className="inline-flex my-4">
            <button
              type="submit"
              className="inline-flex items-center w-full h-[2.7em] rounded-[10px] border border-zinc-500 text-stone-500 font-medium px-5"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login to Eventhive"}
              <span className="ml-2">
                <FaArrowRight />
              </span>
            </button>
          </div>
        </form>

        <p className="text-sm md:text-base">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign up
          </Link>{" "}
          to your account account
        </p>
      </div>
    </div>
    <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
